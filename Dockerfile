FROM ubuntu:22.04

# 1. Hindari interaksi terminal selama instalasi sistem
ENV DEBIAN_FRONTEND=noninteractive

# 2. Pasang perkakas build C++ (Wajib untuk node-pty), CA Certs, dan dependensi GUI Electron
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gnupg \
    build-essential \
    make \
    g++ \
    python3 \
    libgtk-3-0 \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libasound2 \
    xvfb \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# 3. Pasang Node.js menggunakan metode GPG Key yang aman dari NodeSource
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 4. Tentukan direktori kerja di dalam kontainer
WORKDIR /workspace/borneoos

# 5. Salin package manifest dan pasang dependensi proyek secara normal
COPY package*.json ./
RUN npm install

# Paksa HANYA node-pty yang melakukan kompilasi ulang menggunakan compiler internal kontainer
RUN npm rebuild node-pty --build-from-source

# 6. Salin seluruh kode sumber proyek sisa
COPY . .

# Tambahkan ini untuk mematikan warning ketat V8 dan menyamakan pointer tag
ENV CFLAGS="-DNODE_O_OUTPUT"
ENV CXXFLAGS="-DV8_ENABLE_SANDBOX -DV8_COMPRESSED_POINTERS"

# Kode Dockerfile kamu yang lama:
# 7. Build aplikasi Electron menjadi distribusi Linux
RUN npm run build

# Ekspos port display server virtual
EXPOSE 6901

# Jalankan monitor gaib Xvfb dan luncurkan BorneoOS
CMD ["sh", "-c", "Xvfb :1 -screen 0 1280x720x24 & DISPLAY=:1 npm start -- --no-sandbox"]