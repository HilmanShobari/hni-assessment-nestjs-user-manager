# DFD - Detail Proses User

## 1. Login User  
**Endpoint:** `POST /api/login`
**Authentication:** ❌ Tidak membutuhkan token

### Input:
- `email`
- `password`

### Proses:
1. Cari user berdasarkan `email`
2. Validasi password (compare dengan hash)
3. Generate JWT Token

### Output:
- Response: `{ token }`

---

## 2. Register User  
**Endpoint:** `POST /api/users`
**Authentication:** ✅ Butuh header `Authorization: Bearer <token>`

### Header:
- `Authorization: Bearer <token>`

### Input:
- `name`
- `email`
- `password`
- `role`

### Proses:
1. Validasi input
2. Cek apakah `email` sudah digunakan
3. Hash password
4. Simpan data ke tabel `users`

### Output:
- Response: Success

---

## 3. Ambil Semua User  
**Endpoint:** `GET /api/users`
**Authentication:** ✅ Butuh header `Authorization: Bearer <token>`

### Header:
- `Authorization: Bearer <token>`

### Proses:
1. Ambil seluruh user dari tabel `users` (kecuali yang `is_deleted` `true`)
2. Join dengan tabel `roles` untuk mendapatkan nama role

### Output:
- Response: Daftar user beserta nama role-nya

---

## 4. Ambil Detail User  
**Endpoint:** `GET /api/users/:id`
**Authentication:** ✅ Butuh header `Authorization: Bearer <token>`

### Header:
- `Authorization: Bearer <token>`

### Proses:
1. Ambil user berdasarkan `id`
2. Join dengan tabel `roles` untuk mendapatkan nama role

### Output:
- Response: Detail user (beserta nama role)

---

## 5. Hapus User (Soft Delete)  
**Endpoint:** `DELETE /api/users/:id`
**Authentication:** ✅ Butuh header `Authorization: Bearer <token>`

### Header:
- `Authorization: Bearer <token>`

### Proses:
1. Update kolom `is_deleted` dengan nilai true
2. Update kolom `deleted_at` dengan timestamp sekarang

### Output:
- Response: Success
