# Generate PWA Icons

Untuk membuat icon PWA, Anda bisa menggunakan salah satu cara berikut:

## Option 1: Online Tool (Recommended)
1. Buka https://realfavicongenerator.net/
2. Upload file `public/icon.svg`
3. Generate dan download semua icon
4. Extract dan copy `icon-192.png` dan `icon-512.png` ke folder `public/`

## Option 2: Manual dengan Design Tool
1. Buka `public/icon.svg` di Figma/Illustrator/Inkscape
2. Export sebagai PNG dengan ukuran:
   - 192x192px → save as `icon-192.png`
   - 512x512px → save as `icon-512.png`
3. Copy kedua file ke folder `public/`

## Option 3: Menggunakan ImageMagick (CLI)
```bash
# Install ImageMagick terlebih dahulu
brew install imagemagick  # macOS
# atau
sudo apt-get install imagemagick  # Linux

# Generate icons
convert public/icon.svg -resize 192x192 public/icon-192.png
convert public/icon.svg -resize 512x512 public/icon-512.png
```

## Temporary Solution
Untuk sementara, Anda bisa menggunakan placeholder atau copy icon yang sudah ada:
```bash
# Copy dari project lain atau buat placeholder
cp path/to/your/icon-192.png ramadhan-v2/public/
cp path/to/your/icon-512.png ramadhan-v2/public/
```

Setelah icon dibuat, PWA akan siap untuk diinstall di mobile device!
