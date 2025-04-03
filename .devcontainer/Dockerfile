FROM node:20-slim

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Instalar Stripe CLI
RUN curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | tee /usr/share/keyrings/stripe.gpg > /dev/null
RUN echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | tee -a /etc/apt/sources.list.d/stripe.list
RUN apt-get update && apt-get install -y stripe && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo
WORKDIR /workspace

# Configurar el shell por defecto
SHELL ["/bin/bash", "-c"]

# Comando por defecto
CMD ["sleep", "infinity"] 