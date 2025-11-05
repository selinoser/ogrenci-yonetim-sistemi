Öğrenci Yönetim Sistemi

ASP.NET Core Web API (backend) ve Angular + Material UI (frontend) kullanılarak geliştirilmiş tam kapsamlı bir Öğrenci Yönetim Sistemi.

---

Özellikler

- Öğrenci ekleme, güncelleme, silme işlemleri  
- Adres ve cinsiyet bilgisi yönetimi  
- Otomatik 6 haneli öğrenci numarası oluşturma  
- Türkçe tarih seçici (Datepicker) desteği  
- Dinamik componentler (Dialog, Chip, Tag)  
- Çoklu dil desteğine uygun altyapı (şu an Türkçe)  
- Profil fotoğrafı yükleme ve statik dosya yönetimi  
- SQL Server veritabanı bağlantısı (Entity Framework Core)  
- AutoMapper ile domain ve veri modelleri arasında dönüşüm


Teknoloji 

| **Frontend** | Angular 19, Angular Material, IMask, Moment.js |
| **Backend** | ASP.NET Core 8 Web API |
| **Veritabanı** | Microsoft SQL Server |
| **ORM** | Entity Framework Core |
| **Model Eşleme** | AutoMapper v15 |
| **IDE** | Visual Studio 2022 / VS Code |


Kurulum Adımları

Backend (.NET API)
1. `Student.API` klasörünü Visual Studio veya VS Code ile açın.  
2. Veritabanını oluşturmak için migration komutunu çalıştırın:
   ```bash
   dotnet ef database update
3. dotnet run


Frontend (Angular)

npm install
ng serve


Ek Bilgiler
Tarih bileşeni Türkçe olarak ayarlanmıştır
Profil resimleri /Resources klasöründen servis edilir

