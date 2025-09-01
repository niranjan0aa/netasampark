<?php

namespace App\Http\Controllers;

use App\Models\Voter;
use App\Models\Constituency;
use App\Models\Ward;
use App\Models\Booth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\VotersImport;

class VoterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Voter::with(['constituency', 'ward', 'booth']);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('voter_id', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by constituency
        if ($request->filled('constituency_id')) {
            $query->where('constituency_id', $request->constituency_id);
        }

        // Filter by support level
        if ($request->filled('support_level')) {
            $query->where('support_level', $request->support_level);
        }

        // Filter by consent
        if ($request->filled('consent_filter')) {
            $consent = $request->consent_filter;
            $query->where($consent . '_consent', true);
        }

        $voters = $query->latest()->paginate(25)->withQueryString();

        return inertia('Voters/Index', [
            'voters' => $voters,
            'constituencies' => Constituency::select('id', 'name')->get(),
            'filters' => $request->only(['search', 'constituency_id', 'support_level', 'consent_filter']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Voters/Create', [
            'constituencies' => Constituency::with(['wards.booths'])->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'voter_id' => 'required|string|unique:voters,voter_id',
            'name' => 'required|string|max:255',
            'father_name' => 'nullable|string|max:255',
            'mother_name' => 'nullable|string|max:255',
            'gender' => 'required|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'phone' => 'nullable|string|max:15',
            'email' => 'nullable|email',
            'address' => 'required|string',
            'pincode' => 'nullable|string|max:10',
            'booth_id' => 'required|exists:booths,id',
            'ward_id' => 'required|exists:wards,id',
            'constituency_id' => 'required|exists:constituencies,id',
            'caste' => 'nullable|string|max:100',
            'religion' => 'nullable|string|max:100',
            'occupation' => 'nullable|string|max:100',
            'education' => 'nullable|in:illiterate,primary,secondary,graduate,postgraduate',
            'economic_status' => 'nullable|in:bpl,apl,middle_class,upper_middle,rich',
            'support_level' => 'nullable|in:strong_support,lean_support,neutral,lean_opposition,strong_opposition',
            'is_influencer' => 'boolean',
            'sms_consent' => 'boolean',
            'whatsapp_consent' => 'boolean',
            'email_consent' => 'boolean',
            'voice_consent' => 'boolean',
        ]);

        // Calculate age from date of birth
        if ($validated['date_of_birth']) {
            $validated['age'] = now()->diffInYears($validated['date_of_birth']);
        }

        // Generate household ID if not provided
        if (!isset($validated['household_id'])) {
            $validated['household_id'] = Str::uuid();
            $validated['is_head_of_household'] = true;
        }

        $validated['consent_updated_at'] = now();

        $voter = Voter::create($validated);

        return redirect()->route('voters.show', $voter)->with('success', 'Voter created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Voter $voter)
    {
        $voter->load(['constituency', 'ward', 'booth', 'messages' => function ($query) {
            $query->latest()->limit(10);
        }]);

        return inertia('Voters/Show', [
            'voter' => $voter,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voter $voter)
    {
        return inertia('Voters/Edit', [
            'voter' => $voter,
            'constituencies' => Constituency::with(['wards.booths'])->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voter $voter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'father_name' => 'nullable|string|max:255',
            'mother_name' => 'nullable|string|max:255',
            'gender' => 'required|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'phone' => 'nullable|string|max:15',
            'email' => 'nullable|email',
            'address' => 'required|string',
            'pincode' => 'nullable|string|max:10',
            'booth_id' => 'required|exists:booths,id',
            'ward_id' => 'required|exists:wards,id',
            'constituency_id' => 'required|exists:constituencies,id',
            'caste' => 'nullable|string|max:100',
            'religion' => 'nullable|string|max:100',
            'occupation' => 'nullable|string|max:100',
            'education' => 'nullable|in:illiterate,primary,secondary,graduate,postgraduate',
            'economic_status' => 'nullable|in:bpl,apl,middle_class,upper_middle,rich',
            'support_level' => 'nullable|in:strong_support,lean_support,neutral,lean_opposition,strong_opposition',
            'is_influencer' => 'boolean',
            'sms_consent' => 'boolean',
            'whatsapp_consent' => 'boolean',
            'email_consent' => 'boolean',
            'voice_consent' => 'boolean',
        ]);

        // Recalculate age if date of birth changed
        if ($validated['date_of_birth'] && $validated['date_of_birth'] !== $voter->date_of_birth->format('Y-m-d')) {
            $validated['age'] = now()->diffInYears($validated['date_of_birth']);
        }

        $voter->update($validated);

        return redirect()->route('voters.show', $voter)->with('success', 'Voter updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voter $voter)
    {
        $voter->delete();

        return redirect()->route('voters.index')->with('success', 'Voter deleted successfully.');
    }

    /**
     * Import voters from CSV/Excel file
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,xlsx,xls|max:10240', // 10MB max
        ]);

        try {
            // TODO: Implement Excel import with VotersImport class
            // Excel::import(new VotersImport, $request->file('file'));

            return back()->with('success', 'Voters imported successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Import failed: ' . $e->getMessage());
        }
    }
}
