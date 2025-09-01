FROM laravelsail/php83-composer:latest

# Install system dependencies and node
RUN apt-get update \
  && apt-get install -y git unzip curl gnupg \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs build-essential \
  && npm install -g pnpm

WORKDIR /var/www/html

COPY . /var/www/html

RUN composer install --prefer-dist --no-interaction --no-scripts --no-progress --optimize-autoloader \
  && pnpm install --frozen-lockfile

CMD ["php-fpm"]