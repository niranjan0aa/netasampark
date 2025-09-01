FROM php:8.3-fpm-alpine

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    PHP_OPCACHE_VALIDATE_TIMESTAMPS=0 \
    PHP_MEMORY_LIMIT=512M

RUN apk add --no-cache \ 
        git curl zip unzip libpng libpng-dev libjpeg-turbo libjpeg-turbo-dev libzip-dev oniguruma-dev icu-dev libxml2-dev postgresql-dev freetype freetype-dev \ 
        bash shadow nodejs npm

# PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd intl mbstring pdo pdo_pgsql zip bcmath soap opcache

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer --version

WORKDIR /var/www/html

# Opcache recommended settings
COPY php.ini /usr/local/etc/php/conf.d/php.ini

CMD ["php-fpm"]
