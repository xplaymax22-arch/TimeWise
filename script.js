/**
 * ============================================================================
 * TIMEWISE — SOFT BLUE NEUMORPHISM LOGIC
 * Educational Time Management Website for Students
 * Pure JavaScript Vanilla (ES6+)
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. STORAGE KEYS & INITIAL DATA
     ========================================================================== */
  const STORAGE_KEYS = {
    TASKS: 'timewise_tasks_v1',
    FOCUS_SESSIONS: 'timewise_focus_sessions_v1',
    TIMER: 'timewise_timer_v1',
  };

  // Sample tasks for first-time visitors
  const DEFAULT_SAMPLE_TASKS = [
    {
      id: 'task-sample-1',
      name: 'Membaca Bab 3 Buku Matematika',
      time: '07:30',
      priority: 'Tinggi',
      completed: true,
      createdAt: Date.now() - 3600000,
    },
    {
      id: 'task-sample-2',
      name: 'Mengerjakan Latihan Soal IPA Fisika',
      time: '14:30',
      priority: 'Tinggi',
      completed: false,
      createdAt: Date.now() - 1800000,
    },
    {
      id: 'task-sample-3',
      name: 'Istirahat & Minum Air Putih',
      time: '16:00',
      priority: 'Rendah',
      completed: false,
      createdAt: Date.now() - 1000000,
    },
    {
      id: 'task-sample-4',
      name: 'Menyiapkan Buku & Seragam Besok',
      time: '20:00',
      priority: 'Sedang',
      completed: false,
      createdAt: Date.now(),
    },
  ];

  // 8 Educational Modules Data
  const MATERI_DATA = [
    {
      id: 'materi-1',
      title: 'Pengertian Manajemen Waktu',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      shortDesc: 'Memahami makna perencanaan dan pengendalian sadar atas alokasi 24 jam setiap hari untuk produktivitas optimal.',
      contentHtml: `
        <p><strong>Manajemen Waktu</strong> adalah proses terencana dalam mengorganisasi, menjadwalkan, dan mengalokasikan berapa banyak waktu yang kamu habiskan untuk kegiatan tertentu secara bijaksana.</p>
        <h4>Mengapa Penting Bagi Pelajar?</h4>
        <p>Setiap orang di dunia, baik pelajar berprestasi maupun bukan, memiliki modal waktu yang sama persis: <strong>24 jam dalam sehari</strong>. Yang membedakan kesuksesan akademik dan kebahagiaan hidup seseorang adalah <em>bagaimana mereka mengelola waktu tersebut</em>.</p>
        <h4>Efisiensi vs Efektivitas</h4>
        <ul>
          <li><strong>Efisiensi:</strong> Melakukan suatu tugas dengan cepat dan sedikit tenaga.</li>
          <li><strong>Efektivitas:</strong> Memilih tugas yang tepat dan paling berdampak pada tujuan belajarmu.</li>
        </ul>
        <p>Manajemen waktu yang baik menggabungkan keduanya: kamu tidak hanya sibuk (busy), tetapi benar-benar produktif (productive).</p>
      `
    },
    {
      id: 'materi-2',
      title: 'Tujuan Manajemen Waktu',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
      shortDesc: 'Mengetahui target yang ingin dicapai melalui jadwal teratur, mulai dari akademik prima hingga mental yang sehat.',
      contentHtml: `
        <p>Tujuan utama manajemen waktu bukan untuk membuat hidupmu kaku seperti robot, melainkan memberi kebebasan dan ketenangan batin.</p>
        <h4>Sasaran Utama untuk Siswa SMP/SMA:</h4>
        <ul>
          <li><strong>Mencapai Target Akademik:</strong> Tugas sekolah selesai tepat waktu tanpa sistem kebut semalam (SKS).</li>
          <li><strong>Keseimbangan Hidup (Work-Life Balance):</strong> Memiliki waktu seimbang untuk belajar, ekstrakurikuler, hobi, keluarga, dan istirahat.</li>
          <li><strong>Meredakan Stres & Kecemasan:</strong> Menghindari panik akibat tugas mendadak yang menumpuk di hari pengumpulan.</li>
          <li><strong>Membentuk Kemandirian:</strong> Melatih rasa tanggung jawab atas masa depan sendiri tanpa harus selalu diingatkan orang tua atau guru.</li>
        </ul>
      `
    },
    {
      id: 'materi-3',
      title: 'Manfaat Manajemen Waktu',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`,
      shortDesc: 'Dampak positif nyata yang dirasakan dalam kehidupan sehari-hari, konsentrasi belajar, dan rasa percaya diri.',
      contentHtml: `
        <p>Ketika kamu mulai mengatur waktumu dengan disiplin, kamu akan merasakan transformasi positif:</p>
        <h4>Manfaat Langsung yang Dirasakan:</h4>
        <ul>
          <li><strong>Nilai dan Pemahaman Materi Lebih Tinggi:</strong> Belajar bertahap membuat ingatan jangka panjang (long-term memory) bekerja lebih efektif daripada belajar kilat.</li>
          <li><strong>Waktu Istirahat Berkualitas:</strong> Tidur malam cukup 7–8 jam tanpa rasa bersalah karena tugas sudah terselesaikan lebih awal.</li>
          <li><strong>Peluang Mengembangkan Minat & Bakat:</strong> Punya sisa waktu luang yang aman untuk bermain game, berolahraga, bermusik, atau membaca buku favorit.</li>
          <li><strong>Reputasi Terpercaya:</strong> Dikenal sebagai siswa yang selalu tepat waktu dan bertanggung jawab dalam kerja kelompok.</li>
        </ul>
      `
    },
    {
      id: 'materi-4',
      title: 'Prinsip-Prinsip Manajemen Waktu',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
      shortDesc: 'Pedoman ilmiah populer seperti Matriks Eisenhower, Prinsip Pareto 80/20, dan metode SMART goals.',
      contentHtml: `
        <p>Ada beberapa prinsip legendaris yang diterapkan para tokoh dunia untuk menguasai hari-hari mereka:</p>
        <h4>1. Matriks Eisenhower (Skala Prioritas)</h4>
        <ul>
          <li><strong>Kuadran 1 (Mendesak & Penting):</strong> Kerjakan sekarang (misal: PR besok pagi).</li>
          <li><strong>Kuadran 2 (Tidak Mendesak tapi Penting):</strong> Jadwalkan dengan tenang (misal: mencicil materi ujian akhir, olahraga). <em>Ini kunci sukses terbesar!</em></li>
          <li><strong>Kuadran 3 (Mendesak tapi Tidak Penting):</strong> Delegasikan atau batasi (misal: ajakan main game mendadak di tengah jam belajar).</li>
          <li><strong>Kuadran 4 (Tidak Mendesak & Tidak Penting):</strong> Hapus atau kurangi (misal: doom scrolling media sosial tanpa tujuan).</li>
        </ul>
        <h4>2. Prinsip Pareto (Aturan 80/20)</h4>
        <p>Sebanyak 80% hasil nilai ujianmu biasanya berasal dari 20% pemahaman konsep inti yang paling penting. Cari tahu konsep dasar tersebut terlebih dahulu.</p>
      `
    },
    {
      id: 'materi-5',
      title: 'Cara Mengatur Waktu dengan Baik',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`,
      shortDesc: 'Panduan langkah demi langkah menyusun jadwal harian yang realistis, fleksibel, dan mudah dipatuhi.',
      contentHtml: `
        <p>Menyusun jadwal tidak boleh terlalu muluk-muluk. Ikuti langkah sederhana ini:</p>
        <h4>Langkah Praktis Harian:</h4>
        <ol>
          <li><strong>Tuliskan Semua Tugas (Brain Dump):</strong> Jangan simpan semua agenda di kepalamu. Tuliskan di fitur <em>Daily Planner TimeWise</em>.</li>
          <li><strong>Tentukan 3 Prioritas Utama:</strong> Pilih maksimal 3 tugas terpenting yang jika selesai, harimu sudah dianggap berhasil.</li>
          <li><strong>Terapkan Time Blocking:</strong> Tentukan jam spesifik untuk belajar, bukan sekadar "nanti sore belajar". Misalnya: Jam 15.30 - 16.30 Matematika.</li>
          <li><strong>Beri Jeda Ekstra (Buffer Time):</strong> Jangan buat jadwal yang terlalu padat tanpa jeda istirahat. Beri kelonggaran 15–30 menit jika tugas berlangsung lebih lama.</li>
        </ol>
      `
    },
    {
      id: 'materi-6',
      title: 'Hambatan dalam Manajemen Waktu',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      shortDesc: 'Mengenali godaan penundaan (prokrastinasi), kecanduan layar gadget, dan cara mengatasinya.',
      contentHtml: `
        <p>Banyak pelajar gagal mematuhi jadwal bukan karena malas, tetapi karena terjebak hambatan psikologis:</p>
        <h4>4 Hambatan Terbesar Pelajar:</h4>
        <ul>
          <li><strong>Prokrastinasi:</strong> Menunda tugas karena merasa tugas itu membosankan atau terlalu sulit. <em>Solusi:</em> Pecah tugas menjadi langkah mini berdurasi 5 menit.</li>
          <li><strong>Distraksi Notifikasi Ponsel:</strong> Suara notifikasi chatting atau video pendek merusak fokus otak seketika. <em>Solusi:</em> Taruh ponsel di ruangan lain saat belajar.</li>
          <li><strong>Multitasking (Mengerjakan Banyak Hal Sekaligus):</strong> Otak manusia sebenarnya tidak bisa multitasking, melainkan beralih fokus (task-switching) yang melelahkan otak.</li>
          <li><strong>Kesulitan Menolak (FOMO):</strong> Merasa bersalah menolak ajakan teman saat kamu harus menyelesaikan tugas mendesak.</li>
        </ul>
      `
    },
    {
      id: 'materi-7',
      title: 'Tips Manajemen Waktu',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
      shortDesc: 'Trik cepat seperti Aturan 2 Menit, teknik Pomodoro, dan persiapan malam hari untuk mempermudah rutinitas.',
      contentHtml: `
        <p>Gunakan trik produktivitas berikut untuk mempermudah harimu:</p>
        <h4>Kumpulan Tips Ampuh:</h4>
        <ul>
          <li><strong>Aturan 2 Menit:</strong> Bila ada tugas kecil yang bisa selesai dalam waktu kurang dari 2 menit (misal: masukkan buku ke tas, balas konfirmasi guru), segera kerjakan tanpa menunda.</li>
          <li><strong>Siklus Pomodoro:</strong> Gunakan menu <em>Focus Timer TimeWise</em>. 25 menit belajar fokus, 5 menit istirahat, lalu ulangi.</li>
          <li><strong>Siapkan Malam Sebelumnya:</strong> Cek jadwal pelajaran dan seragam esok hari sebelum tidur agar pagimu tenang dan tidak terburu-buru.</li>
          <li><strong>Reward Diri Sendiri:</strong> Beri penghargaan kecil setelah tugas selesai, seperti menonton satu episode animasi atau camilan favorit.</li>
        </ul>
      `
    },
    {
      id: 'materi-8',
      title: 'Kesimpulan & Refleksi',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      shortDesc: 'Rangkuman pemikiran bahwa mengatur waktu adalah bentuk kepedulian terhadap cita-cita dan kebahagiaan masa depanmu.',
      contentHtml: `
        <p>Manajemen waktu bukan tentang menjadi kaku atau kehilangan masa remaja yang menyenangkan. Sebaliknya, <strong>manajemen waktu adalah alat untuk memberi kamu kebebasan sejati</strong>.</p>
        <h4>Pesan Inti TimeWise:</h4>
        <p>Ketika kamu tahu apa yang harus kamu kerjakan dan kapan harus menyelesaikannya, kamu tidak akan lagi dihantui rasa bersalah saat sedang bersenang-senang atau beristirahat.</p>
        <p>Mulailah dari langkah kecil hari ini. Gunakan fitur <strong>Daily Planner</strong> dan <strong>Focus Timer</strong> di website ini secara konsisten!</p>
      `
    }
  ];

  // Quiz Questions Data (Comprehensive & Educational)
  const QUIZ_QUESTIONS = [
    {
      question: 'Apa definisi paling tepat dari manajemen waktu bagi seorang pelajar?',
      options: [
        'Mengisi seluruh 24 jam dengan belajar tanpa waktu istirahat',
        'Merencanakan dan mengontrol alokasi waktu untuk kegiatan secara efektif',
        'Mengerjakan semua tugas hanya pada malam sebelum hari pengumpulan',
        'Menyerahkan pengaturan waktu sepenuhnya kepada orang tua dan guru'
      ],
      correctIndex: 1,
      explanation: 'Manajemen waktu adalah proses terencana dalam mengorganisasi dan mengendalikan alokasi waktu secara bijak untuk meraih target belajar sekaligus menjaga kesehatan mental.'
    },
    {
      question: 'Berdasarkan Matriks Eisenhower, kegiatan mana yang harus mendapat prioritas paling utama untuk dikerjakan segera?',
      options: [
        'Tugas yang Mendesak dan Penting (Kuadran 1)',
        'Bermain game online bersama teman (Kuadran 4)',
        'Mengecek media sosial saat bosan (Kuadran 4)',
        'Menonton tayangan video hiburan santai (Kuadran 3)'
      ],
      correctIndex: 0,
      explanation: 'Kuadran 1 berisi tugas yang memiliki batas waktu dekat dan konsekuensi signifikan, sehingga wajib diprioritaskan terlebih dahulu.'
    },
    {
      question: 'Berapa durasi standar fase fokus dalam satu siklus teknik Pomodoro klasik?',
      options: [
        '10 Menit',
        '25 Menit',
        '60 Menit',
        '90 Menit'
      ],
      correctIndex: 1,
      explanation: 'Teknik Pomodoro klasik menggunakan interval 25 menit fokus penuh bebas gangguan, diikuti oleh istirahat singkat 5 menit.'
    },
    {
      question: 'Apa yang dimaksud dengan "Prokrastinasi" dalam konteks belajar?',
      options: [
        'Metode menghafal rumus pelajaran dengan cepat',
        'Kebiasaan menunda-nunda pekerjaan penting tanpa alasan yang jelas',
        'Kemampuan mengerjakan beberapa tugas dalam satu waktu',
        'Teknik membuat catatan ringkasan yang menarik'
      ],
      correctIndex: 1,
      explanation: 'Prokrastinasi adalah kecenderungan menunda pengerjaan tugas penting, yang sering kali berujung pada rasa cemas dan sistem kebut semalam.'
    },
    {
      question: 'Mengapa istirahat dan tidur yang cukup (7–8 jam) sangat penting bagi manajemen waktu pelajar?',
      options: [
        'Agar bisa menunda tugas sekolah lebih lama',
        'Hanya untuk membuang-buang waktu luang',
        'Untuk memulihkan energi otak agar konsentrasi dan daya ingat tetap tajam',
        'Supaya tidak perlu mengikuti kegiatan ekstrakurikuler'
      ],
      correctIndex: 2,
      explanation: 'Tanpa tidur dan istirahat yang cukup, kerja otak melambat sehingga kamu akan membutuhkan waktu 2-3 kali lebih lama untuk menyelesaikan tugas yang sama.'
    },
    {
      question: 'Apa manfaat utama dari menerapkan "Aturan 2 Menit" dalam aktivitas harian?',
      options: [
        'Mencegah tugas-tugas kecil menumpuk menjadi beban besar yang melelahkan',
        'Membuat kita bisa menyelesaikan ujian sekolah dalam waktu 2 menit',
        'Mengurangi jam tidur malam pelajar',
        'Menghindari kegiatan olahraga di sekolah'
      ],
      correctIndex: 0,
      explanation: 'Bila tugas kecil langsung diselesaikan dalam 2 menit, meja belajarmu tetap rapi dan pikiranmu terbebas dari tumpukan hal sepele.'
    },
    {
      question: 'Apa langkah awal yang paling berguna saat mulai merencanakan minggu belajar?',
      options: ['Mengisi semua waktu dengan kegiatan', 'Mencatat jadwal tetap dan tenggat tugas', 'Memilih tugas secara acak', 'Menunggu sampai ada tugas yang mendesak'],
      correctIndex: 1,
      explanation: 'Jadwal tetap dan tenggat memberi gambaran nyata tentang waktu yang tersedia dan hal yang perlu diprioritaskan.'
    },
    {
      question: 'Kamu memiliki tugas besar yang tenggatnya masih dua minggu lagi. Apa tindakan terbaik?',
      options: ['Mengabaikannya sampai minggu terakhir', 'Mengerjakan semuanya dalam satu malam', 'Membaginya menjadi beberapa bagian kecil dan menjadwalkannya', 'Meminta teman mengerjakan seluruhnya'],
      correctIndex: 2,
      explanation: 'Memecah tugas besar menjadi tahap kecil membantu kemajuan terasa terukur dan mencegah penumpukan pekerjaan.'
    },
    {
      question: 'Saat menyusun daftar tugas, informasi apa yang paling membantu menentukan urutan pengerjaan?',
      options: ['Tenggat dan tingkat kepentingan', 'Panjang nama tugas', 'Warna buku yang digunakan', 'Urutan tugas saat pertama kali terpikir'],
      correctIndex: 0,
      explanation: 'Kepentingan dan tenggat menunjukkan konsekuensi serta urgensi sehingga urutan kerja bisa dibuat dengan alasan yang jelas.'
    },
    {
      question: 'Apa tujuan utama menetapkan target belajar yang spesifik?',
      options: ['Membuat target terlihat rumit', 'Menghindari evaluasi hasil', 'Menambah jumlah pekerjaan', 'Membuat kemajuan dan langkah berikutnya lebih jelas'],
      correctIndex: 3,
      explanation: 'Target yang spesifik membantu kamu mengetahui apa yang harus dilakukan dan kapan suatu pekerjaan dapat dianggap selesai.'
    },
    {
      question: 'Seseorang belajar sambil terus membuka pesan di ponsel. Dampak yang paling mungkin terjadi?',
      options: ['Fokus selalu meningkat', 'Perhatian terpecah dan pekerjaan bisa lebih lama selesai', 'Tidak perlu membuat jadwal', 'Daya ingat otomatis menjadi sempurna'],
      correctIndex: 1,
      explanation: 'Perpindahan perhatian berulang mengganggu konsentrasi dan membuat tugas membutuhkan waktu lebih lama.'
    },
    {
      question: 'Apa kebiasaan yang tepat sebelum memulai sesi belajar fokus?',
      options: ['Menyiapkan bahan belajar dan mengurangi gangguan', 'Membiarkan notifikasi terus berbunyi', 'Mengerjakan beberapa hal sekaligus', 'Menunda memilih materi sampai sesi berakhir'],
      correctIndex: 0,
      explanation: 'Persiapan bahan dan lingkungan mengurangi jeda serta godaan untuk berhenti di tengah sesi.'
    },
    {
      question: 'Kapan sebaiknya kamu menjadwalkan waktu istirahat?',
      options: ['Hanya setelah semua pekerjaan dalam satu minggu selesai', 'Tidak pernah saat sedang belajar', 'Secara terencana di antara sesi kerja', 'Hanya ketika sudah sangat kelelahan'],
      correctIndex: 2,
      explanation: 'Istirahat terencana membantu menjaga energi dan konsentrasi sebelum kelelahan menumpuk.'
    },
    {
      question: 'Jika perkiraan waktu mengerjakan tugas sering terlalu singkat, apa yang sebaiknya dilakukan?',
      options: ['Menghapus tugas dari daftar', 'Membandingkan perkiraan dengan waktu nyata lalu menyesuaikan rencana', 'Berhenti membuat perkiraan', 'Mengurangi waktu istirahat hingga nol'],
      correctIndex: 1,
      explanation: 'Mencatat waktu nyata memberi dasar yang lebih akurat untuk membuat perkiraan dan jadwal berikutnya.'
    },
    {
      question: 'Apa yang dimaksud dengan waktu penyangga dalam jadwal?',
      options: ['Waktu untuk menambah tugas tanpa batas', 'Waktu yang selalu dibiarkan kosong karena lupa', 'Waktu untuk mengganti seluruh rencana', 'Waktu cadangan untuk keterlambatan atau hal tak terduga'],
      correctIndex: 3,
      explanation: 'Waktu penyangga membuat rencana lebih realistis ketika suatu pekerjaan memerlukan waktu tambahan atau ada perubahan.'
    },
    {
      question: 'Kamu menerima tugas baru ketika jadwal hari ini sudah penuh. Apa respons yang paling bijak?',
      options: ['Menilai prioritas dan tenggat, lalu menjadwalkan ulang dengan realistis', 'Langsung menyetujui tanpa memeriksa jadwal', 'Membatalkan waktu tidur', 'Mengabaikan semua tugas lama'],
      correctIndex: 0,
      explanation: 'Periksa urgensi dan kapasitas sebelum menentukan tugas mana yang dikerjakan dan kapan.'
    },
    {
      question: 'Mengapa daftar tugas harian sebaiknya berisi jumlah pekerjaan yang realistis?',
      options: ['Agar tidak ada pekerjaan penting', 'Supaya daftar tampak lebih pendek', 'Agar rencana dapat dijalankan tanpa membebani diri secara berlebihan', 'Agar semua tugas dikerjakan bersamaan'],
      correctIndex: 2,
      explanation: 'Daftar yang realistis membantu kamu fokus pada prioritas dan menghindari rasa kewalahan.'
    },
    {
      question: 'Mana contoh target belajar yang lebih terukur?',
      options: ['Belajar matematika nanti', 'Mengerjakan latihan nomor 1–10 selama sesi belajar sore ini', 'Menjadi pintar secepatnya', 'Membuka buku jika sempat'],
      correctIndex: 1,
      explanation: 'Target dengan cakupan dan waktu yang jelas lebih mudah dilaksanakan dan dievaluasi.'
    },
    {
      question: 'Apa tindakan yang tepat setelah menyelesaikan satu tugas?',
      options: ['Melupakan semua rencana', 'Menambah pekerjaan tanpa melihat kapasitas', 'Langsung mengerjakan tugas lain tanpa jeda', 'Menandai kemajuan dan memeriksa prioritas berikutnya'],
      correctIndex: 3,
      explanation: 'Menandai kemajuan memberi gambaran yang akurat, lalu kamu dapat menentukan langkah selanjutnya dengan tenang.'
    },
    {
      question: 'Tugas mana yang biasanya termasuk penting tetapi tidak mendesak?',
      options: ['Belajar bertahap untuk ujian bulan depan', 'Mengumpulkan tugas yang harus diserahkan satu jam lagi', 'Menjawab pesan tidak penting saat belajar', 'Menonton video hiburan'],
      correctIndex: 0,
      explanation: 'Persiapan jangka panjang penting untuk tujuanmu, tetapi biasanya masih dapat dijadwalkan sebelum menjadi mendesak.'
    },
    {
      question: 'Apa risiko utama kebiasaan sistem kebut semalam?',
      options: ['Semua materi selalu dipahami mendalam', 'Waktu istirahat bertambah', 'Kelelahan dan hasil belajar yang kurang optimal', 'Tenggat tugas otomatis berubah'],
      correctIndex: 2,
      explanation: 'Menumpuk pekerjaan hingga malam terakhir dapat mengurangi tidur, konsentrasi, dan kualitas hasil.'
    },
    {
      question: 'Bagaimana cara yang baik menghadapi tugas yang terasa terlalu sulit untuk dimulai?',
      options: ['Menunggu sampai merasa sangat termotivasi', 'Memulai dari langkah kecil yang jelas', 'Menghapusnya dari jadwal', 'Mengerjakan tugas lain tanpa batas'],
      correctIndex: 1,
      explanation: 'Langkah awal yang kecil mengurangi hambatan untuk memulai dan membuat tugas besar terasa lebih mudah dikelola.'
    },
    {
      question: 'Apa contoh gangguan eksternal saat belajar?',
      options: ['Rasa khawatir tentang nilai', 'Kesulitan memahami materi', 'Pikiran yang melayang', 'Suara televisi keras di ruangan'],
      correctIndex: 3,
      explanation: 'Gangguan eksternal berasal dari lingkungan, seperti suara bising atau notifikasi perangkat.'
    },
    {
      question: 'Apa cara efektif mengurangi gangguan dari ponsel selama sesi fokus?',
      options: ['Mengaktifkan mode senyap dan meletakkannya di luar jangkauan', 'Membuka semua aplikasi', 'Memeriksa layar setiap menit', 'Menyalakan semua notifikasi'],
      correctIndex: 0,
      explanation: 'Membatasi notifikasi dan akses ke ponsel mengurangi godaan untuk mengalihkan perhatian.'
    },
    {
      question: 'Saat fokus mulai menurun setelah belajar lama, apa pilihan yang baik?',
      options: ['Memaksakan belajar tanpa henti', 'Berpindah-pindah aplikasi', 'Beristirahat singkat lalu kembali sesuai rencana', 'Membatalkan tidur malam'],
      correctIndex: 2,
      explanation: 'Jeda singkat yang terencana membantu memulihkan perhatian sebelum melanjutkan pekerjaan.'
    },
    {
      question: 'Mengapa mengerjakan banyak tugas sekaligus sering kurang efektif?',
      options: ['Karena semua tugas selesai sempurna', 'Karena perhatian sering berpindah dan meningkatkan kemungkinan kesalahan', 'Karena waktu menjadi tidak terbatas', 'Karena tugas tidak membutuhkan konsentrasi'],
      correctIndex: 1,
      explanation: 'Berpindah-pindah tugas membuat otak perlu menyesuaikan fokus berulang kali, yang dapat memperlambat kerja.'
    },
    {
      question: 'Apa yang sebaiknya dilakukan jika ada teman mengajak berbicara saat sesi belajar?',
      options: ['Menghentikan semua rencana belajar hari itu', 'Berbicara sambil mengerjakan semua soal', 'Mengabaikan teman dengan kasar', 'Menyampaikan bahwa kamu sedang fokus dan menentukan waktu untuk berbicara nanti'],
      correctIndex: 3,
      explanation: 'Komunikasi yang sopan membantu menjaga batas fokus sekaligus tetap menghargai teman.'
    },
    {
      question: 'Di mana tempat belajar yang mendukung konsentrasi?',
      options: ['Tempat yang cukup tenang, rapi, dan memiliki perlengkapan yang diperlukan', 'Tempat paling ramai di rumah', 'Tempat yang membuatmu terus berpindah', 'Tempat tanpa penerangan yang memadai'],
      correctIndex: 0,
      explanation: 'Lingkungan yang nyaman dan perlengkapan yang siap membantu mengurangi gangguan saat belajar.'
    },
    {
      question: 'Apa manfaat mengelompokkan tugas sejenis, misalnya membalas pesan pada satu waktu?',
      options: ['Membuat pesan selalu lebih penting dari belajar', 'Menghilangkan kebutuhan membuat jadwal', 'Mengurangi perpindahan konteks dan gangguan berulang', 'Menambah jumlah tugas'],
      correctIndex: 2,
      explanation: 'Mengelompokkan pekerjaan sejenis mengurangi waktu yang hilang karena sering berganti aktivitas.'
    },
    {
      question: 'Bagaimana cara terbaik menangani gangguan yang tidak dapat dihindari?',
      options: ['Menyalahkan diri sepanjang hari', 'Mencatat dampaknya lalu menyesuaikan jadwal dan kembali fokus', 'Membatalkan seluruh target mingguan', 'Mengerjakan tanpa memikirkan prioritas'],
      correctIndex: 1,
      explanation: 'Gangguan tidak selalu bisa dicegah; evaluasi singkat dan penyesuaian jadwal membantu pekerjaan tetap berjalan.'
    },
    {
      question: 'Apa manfaat menyiapkan buku dan alat tulis sebelum sesi belajar?',
      options: ['Membuat tugas bertambah', 'Menghilangkan waktu istirahat', 'Membuat kita tidak perlu menentukan target', 'Mengurangi jeda untuk mencari perlengkapan saat belajar'],
      correctIndex: 3,
      explanation: 'Perlengkapan yang siap membantu sesi belajar dimulai tepat waktu dan mengurangi gangguan kecil.'
    },
    {
      question: 'Jika notifikasi grup kelas sering mengganggu, apa langkah yang masuk akal?',
      options: ['Mematikan notifikasi sementara dan memeriksa grup pada waktu terjadwal', 'Keluar dari semua pelajaran', 'Membalas setiap pesan saat muncul', 'Menghapus jadwal belajar'],
      correctIndex: 0,
      explanation: 'Pemeriksaan terjadwal menjaga kamu tetap mendapat informasi tanpa terus-menerus memutus fokus.'
    },
    {
      question: 'Apa yang sebaiknya dilakukan ketika rencana harian tidak berjalan sesuai perkiraan?',
      options: ['Menganggap semua usaha gagal', 'Memaksakan semua pekerjaan selesai sekaligus', 'Meninjau prioritas dan menyusun ulang sisa waktu', 'Menghapus waktu tidur'],
      correctIndex: 2,
      explanation: 'Rencana dapat berubah; menata ulang prioritas lebih bermanfaat daripada menyerah atau memaksakan diri.'
    },
    {
      question: 'Mengapa sebaiknya waktu bermain dan bersantai juga dimasukkan ke dalam rencana?',
      options: ['Supaya tugas sekolah diabaikan', 'Agar keseimbangan dan waktu pemulihan tetap terjaga', 'Supaya tidak perlu menetapkan prioritas', 'Agar setiap menit harus produktif'],
      correctIndex: 1,
      explanation: 'Jadwal yang seimbang mencakup tanggung jawab, istirahat, dan kegiatan menyenangkan.'
    },
    {
      question: 'Apa manfaat mengevaluasi jadwal di akhir hari?',
      options: ['Mencari alasan untuk tidak belajar', 'Menghapus semua target', 'Membuat jadwal lebih padat tanpa pertimbangan', 'Mengetahui apa yang berhasil dan apa yang perlu disesuaikan'],
      correctIndex: 3,
      explanation: 'Refleksi singkat membantu kamu memperbaiki rencana berdasarkan pengalaman nyata.'
    },
    {
      question: 'Jika suatu tugas membutuhkan waktu lebih lama dari rencana, apa yang sebaiknya dilakukan?',
      options: ['Menilai sisa prioritas dan mengatur ulang jadwal dengan waktu yang masuk akal', 'Membatalkan semua tugas lain secara otomatis', 'Mengurangi waktu tidur untuk setiap tugas', 'Berhenti mencatat waktu'],
      correctIndex: 0,
      explanation: 'Periksa konsekuensi dan tenggat tugas lain, lalu sesuaikan jadwal tanpa mengorbankan kebutuhan dasar.'
    },
    {
      question: 'Apa tujuan membuat jadwal mingguan, bukan hanya jadwal harian?',
      options: ['Mengisi seluruh waktu kosong', 'Memastikan setiap hari sama persis', 'Melihat tenggat dan beban kegiatan dalam gambaran yang lebih luas', 'Menghindari perubahan rencana'],
      correctIndex: 2,
      explanation: 'Pandangan mingguan membantu membagi beban dan mengetahui kapan perlu mulai mengerjakan tugas.'
    },
    {
      question: 'Bagaimana cara membagi waktu untuk mempelajari materi ujian yang banyak?',
      options: ['Mempelajari semuanya sekali duduk', 'Membaginya ke beberapa sesi dan topik', 'Hanya membaca topik yang paling mudah', 'Menunggu malam sebelum ujian'],
      correctIndex: 1,
      explanation: 'Sesi dan topik yang dibagi membuat belajar lebih teratur dan memberi kesempatan untuk mengulang materi.'
    },
    {
      question: 'Apa langkah yang baik saat merasa kewalahan melihat banyak tugas?',
      options: ['Berhenti memikirkan semuanya selamanya', 'Mengerjakan yang paling mudah tanpa melihat tenggat', 'Menambahkan lebih banyak kegiatan', 'Menuliskan tugas lalu memilih satu prioritas untuk dimulai'],
      correctIndex: 3,
      explanation: 'Mengeluarkan tugas dari pikiran ke daftar dan memilih satu langkah membantu mengurangi rasa kewalahan.'
    },
    {
      question: 'Untuk apa daftar "tugas berikutnya" bermanfaat?',
      options: ['Menyimpan pekerjaan yang belum bisa dilakukan sekarang agar tidak terlupa', 'Menghapus tugas penting', 'Menunda semua pekerjaan tanpa jadwal', 'Membuat tugas menjadi lebih sulit'],
      correctIndex: 0,
      explanation: 'Daftar ini menampung hal yang perlu ditindaklanjuti nanti sehingga tidak mengganggu fokus pada prioritas saat ini.'
    },
    {
      question: 'Apa cara yang baik menentukan prioritas ketika dua tugas sama-sama penting?',
      options: ['Memilih berdasarkan warna sampul', 'Menunggu sampai salah satunya menjadi terlambat', 'Membandingkan tenggat, perkiraan durasi, dan konsekuensinya', 'Mengerjakan keduanya bersamaan'],
      correctIndex: 2,
      explanation: 'Tenggat, durasi, dan konsekuensi membantu menentukan urutan yang paling masuk akal.'
    },
    {
      question: 'Apa fungsi tenggat antara (milestone) pada proyek yang panjang?',
      options: ['Mengganti tenggat akhir', 'Membantu memantau kemajuan melalui target tahap demi tahap', 'Menambah pekerjaan yang tidak terkait', 'Membuat tugas tidak perlu diperiksa'],
      correctIndex: 1,
      explanation: 'Milestone menunjukkan apakah proyek bergerak sesuai rencana sebelum tenggat akhir tiba.'
    },
    {
      question: 'Bagaimana sebaiknya menggunakan kalender untuk tugas sekolah?',
      options: ['Hanya mencatat hari libur', 'Mengisi jadwal tanpa memeriksa waktu yang tersedia', 'Mencatat semua hal tanpa tanggal', 'Menandai tenggat dan waktu yang direncanakan untuk mengerjakan tugas'],
      correctIndex: 3,
      explanation: 'Mencatat tenggat dan sesi kerja membuat komitmen lebih terlihat serta lebih mudah diingat.'
    },
    {
      question: 'Apa arti membuat rencana yang fleksibel?',
      options: ['Memiliki prioritas tetapi siap menyesuaikan jadwal jika keadaan berubah', 'Tidak memiliki target sama sekali', 'Selalu membatalkan rencana', 'Mengerjakan tugas hanya jika sedang ingin'],
      correctIndex: 0,
      explanation: 'Fleksibilitas berarti rencana dapat disesuaikan tanpa kehilangan tujuan dan prioritas utama.'
    },
    {
      question: 'Jika tugas kelompok bergantung pada bagianmu, apa kebiasaan yang membantu tim?',
      options: ['Menunggu teman menanyakan', 'Mengubah isi tugas tanpa memberi kabar', 'Menyepakati tenggat bagianmu dan memberi kabar tentang kemajuan', 'Mengerjakan bagian lain saja'],
      correctIndex: 2,
      explanation: 'Komunikasi dan tenggat yang disepakati membantu anggota lain mengatur pekerjaan mereka.'
    },
    {
      question: 'Apa kebiasaan yang membantu menghindari lupa tenggat tugas?',
      options: ['Mengandalkan ingatan saja', 'Mencatat tenggat di kalender atau pengingat yang rutin diperiksa', 'Menunggu pengingat dari teman', 'Menyembunyikan daftar tugas'],
      correctIndex: 1,
      explanation: 'Catatan dan pengingat yang konsisten mengurangi ketergantungan pada ingatan.'
    },
    {
      question: 'Mengapa penting memperkirakan durasi tugas sebelum membuat jadwal?',
      options: ['Agar semua tugas tampak singkat', 'Supaya tenggat bisa diabaikan', 'Agar tidak ada waktu istirahat', 'Agar jumlah pekerjaan sesuai dengan waktu yang benar-benar tersedia'],
      correctIndex: 3,
      explanation: 'Perkiraan durasi membantu memastikan rencana harian dapat dilakukan, bukan sekadar daftar harapan.'
    },
    {
      question: 'Apa cara yang tepat menghadapi tenggat yang terasa tidak realistis?',
      options: ['Segera berkomunikasi dengan pihak terkait dan menyusun pilihan yang memungkinkan', 'Diam saja hingga tenggat lewat', 'Menghapus tugas dari ingatan', 'Mengerjakan tanpa menentukan bagian penting'],
      correctIndex: 0,
      explanation: 'Komunikasi lebih awal memberi kesempatan untuk meminta arahan atau menyepakati penyesuaian dengan bertanggung jawab.'
    },
    {
      question: 'Apa manfaat memulai persiapan ujian beberapa hari sebelumnya?',
      options: ['Membuat semua materi langsung mudah', 'Meniadakan kebutuhan tidur', 'Memberi waktu untuk belajar bertahap dan meninjau bagian yang belum dipahami', 'Membuat ujian tidak perlu diikuti'],
      correctIndex: 2,
      explanation: 'Persiapan bertahap memberi ruang untuk mengulang materi dan mencari bantuan pada topik yang sulit.'
    },
    {
      question: 'Saat menulis daftar tugas, tindakan mana yang membantu tugas besar terasa lebih mudah dikelola?',
      options: ['Menulisnya dengan nama yang lebih panjang', 'Menuliskan beberapa langkah konkret yang harus dilakukan', 'Menyimpannya tanpa tenggat', 'Mencampurnya dengan kegiatan yang tidak terkait'],
      correctIndex: 1,
      explanation: 'Langkah konkret menjelaskan cara memulai dan membuat kemajuan dapat dipantau.'
    },
    {
      question: 'Apa tujuan menentukan batas waktu untuk sebuah sesi belajar?',
      options: ['Membuatmu berhenti belajar selamanya', 'Memastikan tugas selalu selesai dalam satu menit', 'Menghilangkan kebutuhan memahami materi', 'Membantu menjaga fokus dan memberi batas yang jelas pada pekerjaan'],
      correctIndex: 3,
      explanation: 'Batas waktu yang wajar membantu kamu tetap fokus dan mengevaluasi apakah durasi yang direncanakan sesuai.'
    },
    {
      question: 'Apa contoh penggunaan waktu luang singkat yang bermanfaat?',
      options: ['Meninjau catatan ringkas atau menyiapkan perlengkapan untuk tugas berikutnya', 'Memulai proyek besar yang tidak bisa dilanjutkan', 'Membuat jadwal tanpa memeriksa tenggat', 'Menghapus waktu istirahat sepanjang hari'],
      correctIndex: 0,
      explanation: 'Kegiatan singkat seperti meninjau catatan atau menyiapkan perlengkapan dapat memanfaatkan jeda tanpa membuat jadwal berlebihan.'
    },
    {
      question: 'Apa yang sebaiknya dilakukan ketika beberapa kegiatan ekstrakurikuler bertabrakan dengan waktu belajar?',
      options: ['Membatalkan semua kegiatan tanpa diskusi', 'Mengabaikan tugas sekolah', 'Meninjau komitmen, prioritas, dan berdiskusi untuk menemukan jadwal yang seimbang', 'Tidak mencatat kegiatan apa pun'],
      correctIndex: 2,
      explanation: 'Meninjau komitmen secara menyeluruh membantu menjaga keseimbangan dan menemukan penyesuaian yang realistis.'
    },
    {
      question: 'Mengapa tujuan jangka panjang sebaiknya dipecah menjadi target mingguan?',
      options: ['Agar tujuan akhir berubah setiap hari', 'Supaya ada tindakan dekat yang dapat dilakukan dan diperiksa', 'Agar pekerjaan tidak pernah selesai', 'Untuk menghindari evaluasi kemajuan'],
      correctIndex: 1,
      explanation: 'Target mingguan menghubungkan tujuan besar dengan langkah nyata yang dapat dikerjakan sekarang.'
    },
    {
      question: 'Apa yang dimaksud dengan kebiasaan meninjau rencana secara berkala?',
      options: ['Menulis rencana sekali lalu tidak pernah melihatnya', 'Mengganti semua target setiap jam', 'Menilai diri berdasarkan jumlah halaman saja', 'Memeriksa kemajuan dan memperbarui jadwal sesuai keadaan'],
      correctIndex: 3,
      explanation: 'Peninjauan rutin membantu jadwal tetap relevan saat tugas selesai atau prioritas berubah.'
    },
    {
      question: 'Bagaimana cara menggunakan alarm atau pengingat secara efektif?',
      options: ['Gunakan untuk tenggat penting atau waktu mulai, tanpa membuat terlalu banyak pengingat yang tidak perlu', 'Pasang setiap menit untuk semua aktivitas', 'Gunakan hanya setelah tenggat terlewat', 'Abaikan setiap pengingat yang berbunyi'],
      correctIndex: 0,
      explanation: 'Pengingat yang selektif membantu menandai momen penting tanpa menjadi gangguan baru.'
    },
    {
      question: 'Apa manfaat mengatur tas dan bahan sekolah pada malam sebelumnya?',
      options: ['Membuat waktu tidur berkurang', 'Menambah tugas mendadak di pagi hari', 'Mengurangi kerepotan dan risiko lupa saat pagi hari', 'Menghilangkan kebutuhan memeriksa jadwal'],
      correctIndex: 2,
      explanation: 'Persiapan malam hari mengurangi keputusan dan pencarian barang ketika waktu pagi terbatas.'
    },
    {
      question: 'Apa sebaiknya dilakukan jika target harian berulang kali tidak tercapai?',
      options: ['Menyalahkan diri dan menambah target', 'Mencari penyebabnya lalu menyesuaikan jumlah tugas atau perkiraan waktu', 'Berhenti menetapkan prioritas', 'Mengurangi semua waktu istirahat'],
      correctIndex: 1,
      explanation: 'Pola target yang tidak tercapai dapat menunjukkan jadwal terlalu padat atau perkiraan kurang akurat; evaluasi membantu menemukan perbaikan.'
    },
    {
      question: 'Apa tanda bahwa jadwal belajar perlu diseimbangkan kembali?',
      options: ['Ada waktu istirahat yang cukup', 'Tugas penting sudah dicatat', 'Target dibuat dengan jelas', 'Kamu terus-menerus kelelahan dan tidak punya waktu untuk kebutuhan dasar'],
      correctIndex: 3,
      explanation: 'Jadwal yang mengabaikan tidur, makan, dan istirahat tidak berkelanjutan dan perlu disesuaikan.'
    },
    {
      question: 'Ketika rencana berubah karena keadaan keluarga, sikap yang paling tepat adalah?',
      options: ['Menyesuaikan rencana dengan tenang dan menentukan prioritas baru', 'Menganggap semua target gagal', 'Memaksakan jadwal lama tanpa mempertimbangkan keadaan', 'Mengabaikan komunikasi dengan keluarga'],
      correctIndex: 0,
      explanation: 'Keadaan tak terduga membutuhkan penyesuaian; pilih prioritas baru berdasarkan waktu dan tanggung jawab yang berubah.'
    },
    {
      question: 'Apa cara sehat merayakan kemajuan dalam mengatur waktu?',
      options: ['Menghentikan semua rutinitas', 'Memberi penghargaan yang mengganggu semua rencana berikutnya', 'Mengakui usaha dan memberi jeda atau hadiah kecil yang seimbang', 'Menambah pekerjaan sebagai hukuman'],
      correctIndex: 2,
      explanation: 'Mengapresiasi kemajuan membantu menjaga motivasi, selama penghargaan tetap seimbang dengan tanggung jawab.'
    },
    {
      question: 'Jika satu hari tidak produktif, apa langkah yang paling membantu?',
      options: ['Menganggap diri tidak akan pernah berubah', 'Mengambil pelajaran dari hari itu dan memulai kembali dengan satu prioritas', 'Membuat jadwal dua kali lebih padat besok', 'Meninggalkan semua tugas tanpa peninjauan'],
      correctIndex: 1,
      explanation: 'Satu hari yang sulit bukan kegagalan permanen; refleksi singkat dan langkah kecil membantu membangun kembali kebiasaan.'
    },
    {
      question: 'Apa hubungan manajemen waktu dan kesehatan?',
      options: ['Manajemen waktu berarti menghilangkan semua kegiatan santai', 'Kesehatan tidak berkaitan dengan jadwal', 'Semakin sedikit tidur, semakin baik pengelolaan waktu', 'Jadwal yang baik menyediakan waktu untuk belajar, istirahat, dan kebutuhan diri'],
      correctIndex: 3,
      explanation: 'Pengelolaan waktu yang baik mendukung tujuan tanpa mengabaikan tidur, kesehatan, dan kehidupan pribadi.'
    },
    {
      question: 'Apa langkah pertama yang tepat ketika menyadari kebiasaan menunda mulai muncul?',
      options: ['Kenali pemicunya dan mulai dengan satu langkah kecil yang bisa dilakukan sekarang', 'Menunggu sampai tugas menjadi darurat', 'Menyalahkan orang lain', 'Menghapus semua pengingat'],
      correctIndex: 0,
      explanation: 'Mengenali pemicu dan mengambil tindakan kecil dapat memutus pola menunda sebelum tugas menumpuk.'
    },
    {
      question: 'Apa manfaat mencatat pencapaian kecil dalam rencana belajar?',
      options: ['Membuat semua tugas selesai otomatis', 'Menghilangkan kebutuhan membuat target', 'Membantu melihat kemajuan dan menjaga motivasi', 'Membuat tenggat tidak berlaku'],
      correctIndex: 2,
      explanation: 'Kemajuan kecil yang terlihat membantu kamu memahami bahwa upaya konsisten membawa hasil.'
    },
    {
      question: 'Bagaimana cara membuat jadwal yang lebih mungkin dipatuhi?',
      options: ['Mengisi setiap menit tanpa jeda', 'Menentukan prioritas, memperkirakan durasi, dan menyisakan waktu istirahat', 'Menyalin jadwal orang lain persis', 'Membuat target tanpa batas waktu'],
      correctIndex: 1,
      explanation: 'Jadwal yang mempertimbangkan prioritas, durasi nyata, dan istirahat lebih mudah dijalankan secara konsisten.'
    },
    {
      question: 'Apa inti dari manajemen waktu yang baik?',
      options: ['Mengerjakan sebanyak mungkin tanpa berhenti', 'Mengikuti jadwal meskipun keadaan berubah', 'Menghindari semua kegiatan menyenangkan', 'Menggunakan waktu secara sadar untuk hal penting dengan tetap menjaga keseimbangan'],
      correctIndex: 3,
      explanation: 'Tujuannya bukan memenuhi setiap menit, melainkan memilih penggunaan waktu yang mendukung tanggung jawab dan kesejahteraan.'
    },
    {
      question: 'Apa kebiasaan yang dapat membantu memulai belajar pada waktu yang sudah direncanakan?',
      options: ['Menyiapkan langkah pertama dan perlengkapan sebelum waktu belajar tiba', 'Menunggu tugas terasa mendesak', 'Membuka media sosial terlebih dahulu', 'Mengubah target setiap beberapa menit'],
      correctIndex: 0,
      explanation: 'Langkah awal yang jelas dan perlengkapan yang siap mengurangi hambatan untuk mulai tepat waktu.'
    },
    {
      question: 'Jika kamu menyelesaikan tugas lebih cepat dari perkiraan, apa yang sebaiknya dilakukan?',
      options: ['Mengisi seluruh sisa waktu dengan pekerjaan baru', 'Memeriksa kualitas hasil, lalu memakai sisa waktu sesuai prioritas atau beristirahat', 'Menghapus tugas berikutnya dari daftar', 'Mengabaikan jadwal untuk sisa hari itu'],
      correctIndex: 1,
      explanation: 'Periksa hasil terlebih dahulu, lalu putuskan apakah prioritas berikutnya atau waktu istirahat paling sesuai.'
    },
    {
      question: 'Mengapa penting membedakan kegiatan penting dan kegiatan yang hanya terasa mendesak?',
      options: ['Agar semua pesan selalu dikerjakan dahulu', 'Supaya tugas jangka panjang dapat dilupakan', 'Agar perhatian tetap diberikan pada tujuan dan dampak, bukan hanya tekanan sesaat', 'Supaya tidak perlu membuat daftar tugas'],
      correctIndex: 2,
      explanation: 'Rasa mendesak tidak selalu berarti suatu kegiatan paling penting; melihat dampak membantu menjaga fokus pada tujuan.'
    }
  ];

  const QUIZ_QUESTIONS_PER_DAY = 10;

  function getDailyQuizQuestions(date = new Date()) {
    const elapsedDays = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
    const dayIndex = elapsedDays % 7;
    const firstQuestionIndex = dayIndex * QUIZ_QUESTIONS_PER_DAY;

    return {
      day: dayIndex + 1,
      questions: QUIZ_QUESTIONS.slice(firstQuestionIndex, firstQuestionIndex + QUIZ_QUESTIONS_PER_DAY)
    };
  }

  /* ==========================================================================
     2. APP STATE
     ========================================================================== */
  let appState = {
    tasks: [],
    currentFilter: 'all', // 'all' | 'pending' | 'completed'
    deleteTargetId: null,

    // Timer state
    timerMode: 'focus', // 'focus' | 'break'
    timerDuration: 1500, // 25 min default in seconds
    timerRemaining: 1500,
    timerEndsAt: null,
    timerIntervalId: null,
    isTimerRunning: false,
    timerWasRunning: false,
    focusSessionsCount: 0,
    soundEnabled: true,

    // Quiz state
    quizCurrentIndex: 0,
    quizScore: 0,
    quizSelectedAnswer: null,
    quizAnswered: false,
    quizUserAnswers: [],
    quizQuestions: [],
    quizDay: 1
  };

  /* ==========================================================================
     3. AUDIO SYNTHESIZER (Web Audio API - Offline & Safe)
     ========================================================================== */
  function playNotificationChime() {
    if (!appState.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Play a gentle two-tone chime
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.8);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now + 0.35); // A5
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.7); // D6
      gain2.gain.setValueAtTime(0.2, now + 0.35);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.35);
      osc2.stop(now + 1.2);
    } catch (e) {
      console.warn('Audio Context error or not allowed:', e);
    }
  }

  /* ==========================================================================
     4. TOAST NOTIFICATIONS
     ========================================================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'danger') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    } else {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    const spanText = document.createElement('span');
    spanText.textContent = message;

    toast.innerHTML = iconSvg;
    toast.appendChild(spanText);
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 350);
    }, 3200);
  }

  /* ==========================================================================
     5. LOCAL STORAGE MANAGEMENT
     ========================================================================== */
  function loadInitialData() {
    // Load Tasks
    let shouldSaveTasks = false;
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (storedTasks) {
        const parsed = JSON.parse(storedTasks);
        if (Array.isArray(parsed)) {
          appState.tasks = parsed;
        } else {
          appState.tasks = [...DEFAULT_SAMPLE_TASKS];
          shouldSaveTasks = true;
        }
      } else {
        appState.tasks = [...DEFAULT_SAMPLE_TASKS];
        shouldSaveTasks = true;
      }
    } catch (err) {
      console.warn('Failed to parse tasks from localStorage, initializing sample:', err);
      appState.tasks = [...DEFAULT_SAMPLE_TASKS];
      shouldSaveTasks = true;
    }

    appState.tasks.forEach(task => {
      if (!task.date || !isValidDateString(task.date)) {
        const createdAt = Number.isFinite(task.createdAt) ? task.createdAt : Date.now();
        task.date = getLocalDateString(new Date(createdAt));
        shouldSaveTasks = true;
      }
    });

    const activeTasks = appState.tasks.filter(task => !isTaskExpired(task));
    if (activeTasks.length !== appState.tasks.length) {
      appState.tasks = activeTasks;
      shouldSaveTasks = true;
    }
    if (shouldSaveTasks) {
      saveTasksToStorage();
    }

    // Load Focus Sessions
    try {
      const storedSessions = localStorage.getItem(STORAGE_KEYS.FOCUS_SESSIONS);
      if (storedSessions !== null) {
        const parsedSessions = parseInt(storedSessions, 10);
        appState.focusSessionsCount = isNaN(parsedSessions) ? 0 : parsedSessions;
      } else {
        appState.focusSessionsCount = 0;
      }
    } catch (err) {
      appState.focusSessionsCount = 0;
    }
  }

  function saveTasksToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(appState.tasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err);
    }
    updateDashboardStats();
  }

  function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function isValidDateString(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  function getTaskDateTime(task) {
    if (!isValidDateString(task.date) || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(task.time)) return null;
    const [year, month, day] = task.date.split('-').map(Number);
    const [hours, minutes] = task.time.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }

  function isTaskExpired(task, now = Date.now()) {
    const scheduledAt = getTaskDateTime(task);
    return scheduledAt !== null && scheduledAt.getTime() <= now;
  }

  function removeExpiredTasks(render = true) {
    const activeTasks = appState.tasks.filter(task => !isTaskExpired(task));
    if (activeTasks.length === appState.tasks.length) return;

    appState.tasks = activeTasks;
    saveTasksToStorage();
    if (render) renderTaskList();
  }

  function saveFocusSessionsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.FOCUS_SESSIONS, appState.focusSessionsCount.toString());
    } catch (err) {
      console.error('Failed to save focus sessions:', err);
    }
    updateDashboardStats();
  }

  /* ==========================================================================
     6. DASHBOARD & STATS UPDATE
     ========================================================================== */
  function updateDashboardStats() {
    const totalTasksEl = document.getElementById('stat-total-tasks');
    const completedTasksEl = document.getElementById('stat-completed-tasks');
    const percentageEl = document.getElementById('stat-percentage');
    const focusSessionsEl = document.getElementById('stat-focus-sessions');

    const total = appState.tasks.length;
    const completed = appState.tasks.filter(t => t.completed).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (totalTasksEl) totalTasksEl.textContent = total.toString();
    if (completedTasksEl) completedTasksEl.textContent = completed.toString();
    if (percentageEl) percentageEl.textContent = `${pct}%`;
    if (focusSessionsEl) focusSessionsEl.textContent = appState.focusSessionsCount.toString();

    // Update planner list progress bar
    const plannerPctEl = document.getElementById('planner-progress-pct');
    const plannerFillEl = document.getElementById('planner-progress-fill');
    const plannerCountInfo = document.getElementById('planner-count-info');

    if (plannerPctEl) plannerPctEl.textContent = `${pct}%`;
    if (plannerFillEl) plannerFillEl.style.width = `${pct}%`;
    if (plannerCountInfo) {
      plannerCountInfo.textContent = `${completed} dari ${total} kegiatan diselesaikan`;
    }

    // Update timer session count label
    const timerSessionCountEl = document.getElementById('timer-session-count');
    if (timerSessionCountEl) {
      timerSessionCountEl.textContent = appState.focusSessionsCount.toString();
    }
  }

  /* ==========================================================================
     7. MATERI SECTION & MODAL
     ========================================================================== */
  function initMateriSection() {
    const grid = document.getElementById('materi-grid');
    if (!grid) return;

    grid.innerHTML = '';
    MATERI_DATA.forEach(item => {
      const card = document.createElement('article');
      card.className = 'materi-card';

      const topDiv = document.createElement('div');
      topDiv.className = 'materi-top';

      const iconWrap = document.createElement('div');
      iconWrap.className = 'materi-icon-wrap';
      iconWrap.innerHTML = item.iconSvg;

      const title = document.createElement('h3');
      title.className = 'materi-card-title';
      title.textContent = item.title;

      const desc = document.createElement('p');
      desc.className = 'materi-card-desc';
      desc.textContent = item.shortDesc;

      topDiv.appendChild(iconWrap);
      topDiv.appendChild(title);
      topDiv.appendChild(desc);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-secondary btn-read-materi';
      btn.setAttribute('aria-label', `Baca selengkapnya tentang ${item.title}`);
      btn.innerHTML = `<span>Baca Selengkapnya</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

      btn.addEventListener('click', () => openMateriModal(item));

      card.appendChild(topDiv);
      card.appendChild(btn);
      grid.appendChild(card);
    });

    // Close modal handlers
    const modal = document.getElementById('materi-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const actionCloseBtn = document.getElementById('modal-action-close');

    if (closeBtn) closeBtn.addEventListener('click', closeMateriModal);
    if (actionCloseBtn) actionCloseBtn.addEventListener('click', closeMateriModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeMateriModal();
      });
    }
  }

  function openMateriModal(item) {
    const modal = document.getElementById('materi-modal');
    const titleEl = document.getElementById('modal-materi-title');
    const iconEl = document.getElementById('modal-materi-icon');
    const bodyEl = document.getElementById('modal-materi-body');

    if (!modal || !titleEl || !iconEl || !bodyEl) return;

    titleEl.textContent = item.title;
    iconEl.innerHTML = item.iconSvg;
    bodyEl.innerHTML = item.contentHtml;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMateriModal() {
    const modal = document.getElementById('materi-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  /* ==========================================================================
     8. DAILY PLANNER SECTION
     ========================================================================== */
  function initPlannerSection() {
    // Current Indonesian date
    renderTodayDate();
    removeExpiredTasks(false);
    setInterval(() => removeExpiredTasks(), 60000);

    // Setup task form submit
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
      taskForm.addEventListener('submit', handleAddTask);
    }

    // Set the form defaults to the next five-minute interval.
    const dateInput = document.getElementById('task-date');
    const timeInput = document.getElementById('task-time');
    const defaultSchedule = new Date();
    defaultSchedule.setMinutes(Math.floor(defaultSchedule.getMinutes() / 5) * 5 + 5, 0, 0);
    if (dateInput) dateInput.value = getLocalDateString(defaultSchedule);
    if (timeInput) {
      const hours = String(defaultSchedule.getHours()).padStart(2, '0');
      const minutes = String(defaultSchedule.getMinutes()).padStart(2, '0');
      timeInput.value = `${hours}:${minutes}`;
    }

    // Setup filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        appState.currentFilter = btn.getAttribute('data-filter') || 'all';
        renderTaskList();
      });
    });

    // Setup edit modal
    const editModal = document.getElementById('edit-task-modal');
    const editCloseBtn = document.getElementById('edit-modal-close-btn');
    const editCancelBtn = document.getElementById('edit-modal-cancel-btn');
    const editForm = document.getElementById('edit-task-form');

    if (editCloseBtn) editCloseBtn.addEventListener('click', closeEditModal);
    if (editCancelBtn) editCancelBtn.addEventListener('click', closeEditModal);
    if (editModal) {
      editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
      });
    }
    if (editForm) {
      editForm.addEventListener('submit', handleSaveEditTask);
    }

    // Setup confirm delete modal
    const confirmModal = document.getElementById('confirm-modal');
    const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
    const confirmProceedBtn = document.getElementById('confirm-proceed-btn');

    if (confirmCancelBtn) confirmCancelBtn.addEventListener('click', closeConfirmModal);
    if (confirmProceedBtn) confirmProceedBtn.addEventListener('click', executeDeleteTask);
    if (confirmModal) {
      confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) closeConfirmModal();
      });
    }

    // Initial render
    renderTaskList();
  }

  function renderTodayDate() {
    const dateBadge = document.getElementById('current-date-badge');
    if (!dateBadge) return;

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const today = new Date();
    const dayName = days[today.getDay()];
    const date = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();

    dateBadge.textContent = `${dayName}, ${date} ${monthName} ${year}`;
  }

  function initIllustrationClock() {
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');
    if (!hourHand || !minuteHand || !secondHand) return;

    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    });

    const updateClock = () => {
      const timeParts = timeFormatter.formatToParts(new Date());
      const getPartValue = type => Number(timeParts.find(part => part.type === type)?.value);
      const hours = getPartValue('hour');
      const minutes = getPartValue('minute');
      const seconds = getPartValue('second');

      hourHand.style.transform = `translateX(-50%) rotate(${((hours % 12) + minutes / 60 + seconds / 3600) * 30}deg)`;
      minuteHand.style.transform = `translateX(-50%) rotate(${(minutes + seconds / 60) * 6}deg)`;
      secondHand.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
    };

    updateClock();
    window.setInterval(updateClock, 1000);
  }

  function handleAddTask(e) {
    e.preventDefault();
    const nameInput = document.getElementById('task-name');
    const dateInput = document.getElementById('task-date');
    const timeInput = document.getElementById('task-time');
    const prioritySelect = document.getElementById('task-priority');

    if (!nameInput || !dateInput || !timeInput || !prioritySelect) return;

    const name = nameInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value.trim();
    const priority = prioritySelect.value;

    if (!name) {
      showToast('Nama kegiatan tidak boleh kosong!', 'warning');
      nameInput.focus();
      return;
    }

    if (!time) {
      showToast('Jam kegiatan harus diisi!', 'warning');
      timeInput.focus();
      return;
    }

    if (!date || !isValidDateString(date)) {
      showToast('Tanggal kegiatan harus diisi!', 'warning');
      dateInput.focus();
      return;
    }

    if (!getTaskDateTime({ date, time }) || isTaskExpired({ date, time })) {
      showToast('Tanggal dan jam kegiatan harus berada di waktu mendatang!', 'warning');
      dateInput.focus();
      return;
    }

    const newTask = {
      id: 'task-' + Date.now(),
      name: name,
      date: date,
      time: time,
      priority: priority,
      completed: false,
      createdAt: Date.now()
    };

    appState.tasks.push(newTask);
    saveTasksToStorage();
    renderTaskList();

    // Reset name input and refocus
    nameInput.value = '';
    showToast('Kegiatan berhasil ditambahkan!', 'success');
  }

  function getSortedTasks() {
    // Return tasks sorted by scheduled date and time.
    return [...appState.tasks].sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      if (a.time < b.time) return -1;
      if (a.time > b.time) return 1;
      return a.createdAt - b.createdAt;
    });
  }

  function renderTaskList() {
    const listContainer = document.getElementById('task-list');
    const emptyState = document.getElementById('task-empty-state');
    const emptyMsg = document.getElementById('empty-state-msg');
    if (!listContainer || !emptyState) return;

    listContainer.innerHTML = '';

    const sortedTasks = getSortedTasks();
    let filteredTasks = sortedTasks;

    if (appState.currentFilter === 'pending') {
      filteredTasks = sortedTasks.filter(t => !t.completed);
    } else if (appState.currentFilter === 'completed') {
      filteredTasks = sortedTasks.filter(t => t.completed);
    }

    if (filteredTasks.length === 0) {
      emptyState.classList.remove('hidden');
      if (appState.tasks.length === 0) {
        if (emptyMsg) emptyMsg.textContent = 'Mulai harimu dengan menambahkan agenda kegiatan pada formulir di sebelah kiri.';
      } else if (appState.currentFilter === 'pending') {
        if (emptyMsg) emptyMsg.textContent = 'Hebat! Semua agenda kegiatanmu sudah diselesaikan.';
      } else if (appState.currentFilter === 'completed') {
        if (emptyMsg) emptyMsg.textContent = 'Belum ada kegiatan yang diselesaikan. Centang kegiatan setelah kamu melakukannya!';
      }
    } else {
      emptyState.classList.add('hidden');

      filteredTasks.forEach(task => {
        const itemLi = document.createElement('li');
        itemLi.className = `task-item ${task.completed ? 'completed' : ''}`;
        itemLi.setAttribute('data-id', task.id);

        // Left Container
        const leftDiv = document.createElement('div');
        leftDiv.className = 'task-left';

        // Custom Checkbox
        const checkboxWrap = document.createElement('button');
        checkboxWrap.type = 'button';
        checkboxWrap.className = `custom-checkbox ${task.completed ? 'checked' : ''}`;
        checkboxWrap.setAttribute('role', 'checkbox');
        checkboxWrap.setAttribute('aria-checked', task.completed ? 'true' : 'false');
        checkboxWrap.setAttribute('aria-label', `Tandai selesai ${task.name}`);

        const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        checkSvg.setAttribute('class', 'checkbox-mark');
        checkSvg.setAttribute('viewBox', '0 0 24 24');
        checkSvg.setAttribute('fill', 'none');
        checkSvg.setAttribute('stroke', 'currentColor');
        checkSvg.setAttribute('stroke-width', '3');
        checkSvg.setAttribute('stroke-linecap', 'round');
        checkSvg.setAttribute('stroke-linejoin', 'round');
        const checkPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        checkPoly.setAttribute('points', '20 6 9 17 4 12');
        checkSvg.appendChild(checkPoly);
        checkboxWrap.appendChild(checkSvg);

        checkboxWrap.addEventListener('click', () => toggleTaskComplete(task.id));

        // Details
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'task-details';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'task-title';
        titleDiv.textContent = task.name; // textContent prevents XSS

        const metaDiv = document.createElement('div');
        metaDiv.className = 'task-meta';

        // Date and time badge
        const timeBadge = document.createElement('span');
        timeBadge.className = 'task-time-badge';
        const taskDate = new Date(`${task.date}T00:00:00`);
        const formattedDate = taskDate.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
        timeBadge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${formattedDate}, ${task.time}`;

        // Priority badge
        const priorityBadge = document.createElement('span');
        priorityBadge.className = `priority-badge priority-${task.priority.toLowerCase()}`;
        priorityBadge.textContent = task.priority;

        metaDiv.appendChild(timeBadge);
        metaDiv.appendChild(priorityBadge);

        detailsDiv.appendChild(titleDiv);
        detailsDiv.appendChild(metaDiv);

        leftDiv.appendChild(checkboxWrap);
        leftDiv.appendChild(detailsDiv);

        // Actions (Edit, Delete)
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'task-action-btn btn-task-edit';
        editBtn.setAttribute('aria-label', `Edit tugas ${task.name}`);
        editBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`;
        editBtn.addEventListener('click', () => openEditModal(task));

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'task-action-btn btn-task-delete';
        deleteBtn.setAttribute('aria-label', `Hapus tugas ${task.name}`);
        deleteBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
        deleteBtn.addEventListener('click', () => openConfirmModal(task.id, task.name));

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        itemLi.appendChild(leftDiv);
        itemLi.appendChild(actionsDiv);
        listContainer.appendChild(itemLi);
      });
    }

    updateDashboardStats();
  }

  function toggleTaskComplete(taskId) {
    const task = appState.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    saveTasksToStorage();
    renderTaskList();

    if (task.completed) {
      showToast(`Kegiatan "${task.name}" selesai! Kerja bagus.`, 'success');
    }
  }

  function openEditModal(task) {
    const modal = document.getElementById('edit-task-modal');
    const idInput = document.getElementById('edit-task-id');
    const nameInput = document.getElementById('edit-task-name');
    const dateInput = document.getElementById('edit-task-date');
    const timeInput = document.getElementById('edit-task-time');
    const prioritySelect = document.getElementById('edit-task-priority');

    if (!modal || !idInput || !nameInput || !dateInput || !timeInput || !prioritySelect) return;

    idInput.value = task.id;
    nameInput.value = task.name;
    dateInput.value = task.date;
    timeInput.value = task.time;
    prioritySelect.value = task.priority;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    nameInput.focus();
  }

  function closeEditModal() {
    const modal = document.getElementById('edit-task-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function handleSaveEditTask(e) {
    e.preventDefault();
    const idInput = document.getElementById('edit-task-id');
    const nameInput = document.getElementById('edit-task-name');
    const dateInput = document.getElementById('edit-task-date');
    const timeInput = document.getElementById('edit-task-time');
    const prioritySelect = document.getElementById('edit-task-priority');

    if (!idInput || !nameInput || !dateInput || !timeInput || !prioritySelect) return;

    const id = idInput.value;
    const name = nameInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value.trim();
    const priority = prioritySelect.value;

    if (!name) {
      showToast('Nama kegiatan tidak boleh kosong!', 'warning');
      return;
    }

    if (!date || !isValidDateString(date)) {
      showToast('Tanggal kegiatan harus diisi!', 'warning');
      dateInput.focus();
      return;
    }

    if (!getTaskDateTime({ date, time }) || isTaskExpired({ date, time })) {
      showToast('Tanggal dan jam kegiatan harus berada di waktu mendatang!', 'warning');
      dateInput.focus();
      return;
    }

    const taskIndex = appState.tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
      appState.tasks[taskIndex].name = name;
      appState.tasks[taskIndex].date = date;
      appState.tasks[taskIndex].time = time;
      appState.tasks[taskIndex].priority = priority;

      saveTasksToStorage();
      renderTaskList();
      closeEditModal();
      showToast('Perubahan kegiatan berhasil disimpan!', 'success');
    }
  }

  function openConfirmModal(taskId, taskName) {
    appState.deleteTargetId = taskId;
    const modal = document.getElementById('confirm-modal');
    const descEl = document.getElementById('confirm-modal-desc');

    if (!modal) return;

    if (descEl) {
      descEl.textContent = `Apakah kamu yakin ingin menghapus kegiatan "${taskName}"? Tindakan ini tidak dapat dibatalkan.`;
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeConfirmModal() {
    appState.deleteTargetId = null;
    const modal = document.getElementById('confirm-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function executeDeleteTask() {
    if (!appState.deleteTargetId) return;

    const taskToDelete = appState.tasks.find(t => t.id === appState.deleteTargetId);
    const taskName = taskToDelete ? taskToDelete.name : 'Kegiatan';

    appState.tasks = appState.tasks.filter(t => t.id !== appState.deleteTargetId);
    saveTasksToStorage();
    renderTaskList();
    closeConfirmModal();
    showToast(`"${taskName}" berhasil dihapus.`, 'info');
  }

  /* ==========================================================================
     9. FOCUS TIMER (POMODORO)
     ========================================================================== */
  function initFocusTimer() {
    const startBtn = document.getElementById('timer-start-btn');
    const pauseBtn = document.getElementById('timer-pause-btn');
    const resetBtn = document.getElementById('timer-reset-btn');
    const soundToggle = document.getElementById('timer-sound-toggle');
    const modeChips = document.querySelectorAll('.mode-chip');

    restoreTimerState(modeChips);

    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);

    if (soundToggle) {
      soundToggle.addEventListener('change', (e) => {
        appState.soundEnabled = e.target.checked;
        showToast(
          appState.soundEnabled ? 'Bunyi notifikasi diaktifkan' : 'Bunyi notifikasi dimatikan',
          'info'
        );
      });
    }

    modeChips.forEach(chip => {
      chip.addEventListener('click', () => {
        if (appState.isTimerRunning) {
          pauseTimer();
        }

        modeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const seconds = parseInt(chip.getAttribute('data-time'), 10) || 1500;
        const mode = chip.getAttribute('data-mode') || 'focus';

        appState.timerMode = mode;
        appState.timerDuration = seconds;
        appState.timerRemaining = seconds;
        appState.timerEndsAt = null;

        updateTimerDisplay();
        updateTimerModeLabel();
        saveTimerState();
      });
    });

    updateTimerDisplay();
    updateTimerModeLabel();
    if (appState.timerWasRunning) {
      appState.timerWasRunning = false;
      startTimer();
    }
  }

  function restoreTimerState(modeChips) {
    try {
      const storedTimer = localStorage.getItem(STORAGE_KEYS.TIMER);
      if (!storedTimer) return;

      const timer = JSON.parse(storedTimer);
      if (
        !timer ||
        !['focus', 'break'].includes(timer.mode) ||
        !Number.isFinite(timer.duration) ||
        timer.duration <= 0 ||
        !Number.isFinite(timer.remaining) ||
        timer.remaining < 0
      ) {
        console.warn('Invalid saved timer state; using default timer settings.');
        return;
      }

      appState.timerMode = timer.mode;
      appState.timerDuration = timer.duration;
      appState.timerRemaining = timer.remaining;
      appState.timerEndsAt = Number.isFinite(timer.endsAt) ? timer.endsAt : null;
      appState.timerWasRunning = timer.running === true && appState.timerEndsAt !== null;

      if (appState.timerWasRunning) {
        appState.timerRemaining = Math.max(
          0,
          Math.ceil((appState.timerEndsAt - Date.now()) / 1000)
        );
      }

      modeChips.forEach(chip => {
        const isSelected = chip.getAttribute('data-mode') === appState.timerMode &&
          Number(chip.getAttribute('data-time')) === appState.timerDuration;
        chip.classList.toggle('active', isSelected);
      });
    } catch (err) {
      console.warn('Failed to restore timer state from localStorage:', err);
    }
  }

  function saveTimerState() {
    try {
      localStorage.setItem(STORAGE_KEYS.TIMER, JSON.stringify({
        mode: appState.timerMode,
        duration: appState.timerDuration,
        remaining: appState.timerRemaining,
        running: appState.isTimerRunning,
        endsAt: appState.timerEndsAt
      }));
    } catch (err) {
      console.error('Failed to save timer state to localStorage:', err);
    }
  }

  function updateTimerModeLabel() {
    const statusLabel = document.getElementById('timer-status-label');
    const quoteLabel = document.getElementById('timer-quote');
    const progressRing = document.getElementById('timer-progress-ring');

    if (appState.timerMode === 'focus') {
      if (statusLabel) statusLabel.textContent = 'WAKTU FOKUS';
      if (quoteLabel) quoteLabel.textContent = 'Pertahankan konsentrasimu';
      if (progressRing) progressRing.classList.remove('break-mode');
    } else {
      if (statusLabel) statusLabel.textContent = 'WAKTU ISTIRAHAT';
      if (quoteLabel) quoteLabel.textContent = 'Istirahatkan mata & pikiran sejenak';
      if (progressRing) progressRing.classList.add('break-mode');
    }
  }

  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    const displayEl = document.getElementById('timer-display');
    const progressRing = document.getElementById('timer-progress-ring');

    if (displayEl) {
      displayEl.textContent = formatTime(appState.timerRemaining);
    }

    // Circumference for r=120: 2 * PI * 120 = 753.9822... ≈ 754
    const circumference = 754;
    if (progressRing) {
      const progressFraction = appState.timerRemaining / appState.timerDuration;
      const offset = circumference - (progressFraction * circumference);
      progressRing.style.strokeDashoffset = offset;
    }
  }

  function startTimer() {
    if (appState.isTimerRunning) return; // Prevent multiple intervals

    appState.isTimerRunning = true;
    if (appState.timerEndsAt === null) {
      appState.timerEndsAt = Date.now() + appState.timerRemaining * 1000;
    }

    const startBtn = document.getElementById('timer-start-btn');
    const pauseBtn = document.getElementById('timer-pause-btn');

    if (startBtn) {
      startBtn.disabled = true;
      startBtn.classList.add('btn-active');
    }
    if (pauseBtn) {
      pauseBtn.disabled = false;
    }

    saveTimerState();
    updateTimerCountdown();
    if (appState.isTimerRunning) {
      appState.timerIntervalId = setInterval(updateTimerCountdown, 1000);
    }
  }

  function updateTimerCountdown() {
    if (appState.timerEndsAt === null) return;
    appState.timerRemaining = Math.max(
      0,
      Math.ceil((appState.timerEndsAt - Date.now()) / 1000)
    );
    updateTimerDisplay();

    if (appState.timerRemaining === 0) {
      handleTimerComplete();
    }
  }

  function pauseTimer() {
    if (!appState.isTimerRunning) return;

    if (appState.timerEndsAt !== null) {
      appState.timerRemaining = Math.max(
        0,
        Math.ceil((appState.timerEndsAt - Date.now()) / 1000)
      );
    }
    clearInterval(appState.timerIntervalId);
    appState.timerIntervalId = null;
    appState.isTimerRunning = false;
    appState.timerEndsAt = null;

    const startBtn = document.getElementById('timer-start-btn');
    const pauseBtn = document.getElementById('timer-pause-btn');

    if (startBtn) {
      startBtn.disabled = false;
      startBtn.classList.remove('btn-active');
    }
    if (pauseBtn) {
      pauseBtn.disabled = true;
    }
    updateTimerDisplay();
    saveTimerState();
  }

  function resetTimer() {
    pauseTimer();
    appState.timerRemaining = appState.timerDuration;
    appState.timerEndsAt = null;
    updateTimerDisplay();
    saveTimerState();
    showToast('Timer dikembalikan ke durasi awal.', 'info');
  }

  function handleTimerComplete() {
    pauseTimer();
    appState.timerRemaining = 0;
    saveTimerState();
    playNotificationChime();

    if (appState.timerMode === 'focus') {
      appState.focusSessionsCount++;
      saveFocusSessionsToStorage();

      showToast('Waktu fokus selesai! Hebat, kamu menyelesaikan 1 sesi fokus.', 'success');
      
      // Auto suggest break
      const statusLabel = document.getElementById('timer-status-label');
      if (statusLabel) statusLabel.textContent = 'SESI SELESAI!';
    } else {
      showToast('Waktu istirahat selesai! Siap untuk kembali produktif?', 'info');
    }
  }

  /* ==========================================================================
     10. KUIS MANAJEMEN WAKTU
     ========================================================================== */
  function initQuiz() {
    const nextBtn = document.getElementById('quiz-next-btn');
    const restartBtn = document.getElementById('quiz-restart-btn');
    const dailyQuiz = getDailyQuizQuestions();

    appState.quizQuestions = dailyQuiz.questions;
    appState.quizDay = dailyQuiz.day;

    if (nextBtn) nextBtn.addEventListener('click', handleNextQuizQuestion);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);

    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    const cardActive = document.getElementById('quiz-card-active');
    const cardResult = document.getElementById('quiz-card-result');
    const stepText = document.getElementById('quiz-step-text');
    const scoreText = document.getElementById('quiz-live-score');
    const progressBar = document.getElementById('quiz-progress-bar');
    const questionTitle = document.getElementById('quiz-question-title');
    const optionsContainer = document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (!cardActive || !cardResult || !optionsContainer) return;

    cardActive.classList.remove('hidden');
    cardResult.classList.add('hidden');
    if (feedbackBox) feedbackBox.classList.add('hidden');
    if (nextBtn) nextBtn.disabled = true;

    appState.quizAnswered = false;
    appState.quizSelectedAnswer = null;

    const totalQuestions = appState.quizQuestions.length;
    const currentQ = appState.quizQuestions[appState.quizCurrentIndex];

    if (stepText) stepText.textContent = `Pertanyaan ${appState.quizCurrentIndex + 1} dari ${totalQuestions} · Hari ${appState.quizDay} dari 7`;
    if (scoreText) scoreText.textContent = `Skor: ${appState.quizScore}`;
    if (progressBar) {
      const pct = Math.round(((appState.quizCurrentIndex + 1) / totalQuestions) * 100);
      progressBar.style.width = `${pct}%`;
    }

    if (questionTitle) questionTitle.textContent = currentQ.question;

    optionsContainer.innerHTML = '';
    const prefixes = ['A', 'B', 'C', 'D'];

    currentQ.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');

      const prefixSpan = document.createElement('span');
      prefixSpan.className = 'option-prefix';
      prefixSpan.textContent = prefixes[idx];

      const textSpan = document.createElement('span');
      textSpan.className = 'option-text';
      textSpan.textContent = optText;

      btn.appendChild(prefixSpan);
      btn.appendChild(textSpan);

      btn.addEventListener('click', () => handleSelectQuizAnswer(idx, btn));
      optionsContainer.appendChild(btn);
    });
  }

  function handleSelectQuizAnswer(selectedIndex, clickedBtn) {
    if (appState.quizAnswered) return; // Prevent double answer selection

    appState.quizAnswered = true;
    appState.quizSelectedAnswer = selectedIndex;

    const currentQ = appState.quizQuestions[appState.quizCurrentIndex];
    const isCorrect = selectedIndex === currentQ.correctIndex;

    // Record answer history
    appState.quizUserAnswers.push({
      question: currentQ.question,
      isCorrect: isCorrect,
      selected: currentQ.options[selectedIndex],
      correct: currentQ.options[currentQ.correctIndex]
    });

    if (isCorrect) {
      const pointsPerQ = Math.round(100 / appState.quizQuestions.length);
      appState.quizScore += pointsPerQ;
    }

    const liveScoreEl = document.getElementById('quiz-live-score');
    if (liveScoreEl) liveScoreEl.textContent = `Skor: ${appState.quizScore}`;

    // Update buttons styling
    const allOptionBtns = document.querySelectorAll('.quiz-option-btn');
    allOptionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === currentQ.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    // Show feedback explanation
    const feedbackBox = document.getElementById('quiz-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackDesc = document.getElementById('feedback-desc');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (feedbackBox && feedbackIcon && feedbackTitle && feedbackDesc) {
      feedbackBox.classList.remove('hidden', 'feedback-correct', 'feedback-wrong');
      if (isCorrect) {
        feedbackBox.classList.add('feedback-correct');
        feedbackIcon.textContent = '🎉';
        feedbackTitle.textContent = 'Tepat Sekali!';
      } else {
        feedbackBox.classList.add('feedback-wrong');
        feedbackIcon.textContent = '💡';
        feedbackTitle.textContent = 'Kurang Tepat';
      }
      feedbackDesc.textContent = currentQ.explanation;
    }

    if (nextBtn) {
      nextBtn.disabled = false;
      const isLast = appState.quizCurrentIndex === appState.quizQuestions.length - 1;
      const nextBtnSpan = nextBtn.querySelector('span');
      if (nextBtnSpan) nextBtnSpan.textContent = isLast ? 'Lihat Hasil Kuis' : 'Selanjutnya';
    }
  }

  function handleNextQuizQuestion() {
    if (appState.quizCurrentIndex < appState.quizQuestions.length - 1) {
      appState.quizCurrentIndex++;
      renderCurrentQuestion();
    } else {
      renderQuizResult();
    }
  }

  function renderQuizResult() {
    const cardActive = document.getElementById('quiz-card-active');
    const cardResult = document.getElementById('quiz-card-result');
    const scoreNum = document.getElementById('result-score-num');
    const feedbackMsg = document.getElementById('result-feedback-msg');
    const breakdownEl = document.getElementById('result-breakdown');

    if (!cardActive || !cardResult) return;

    cardActive.classList.add('hidden');
    cardResult.classList.remove('hidden');

    // Final score calculation
    const correctCount = appState.quizUserAnswers.filter(a => a.isCorrect).length;
    const totalCount = appState.quizQuestions.length;
    const finalScore = Math.round((correctCount / totalCount) * 100);

    if (scoreNum) scoreNum.textContent = finalScore.toString();

    let message = '';
    if (finalScore >= 85) {
      message = 'Luar Biasa! Pemahaman manajemen waktumu sangat matang. Terapkan strategi ini di keseharianmu untuk meraih prestasi terbaik!';
    } else if (finalScore >= 65) {
      message = 'Bagus! Kamu sudah memahami konsep dasar manajemen waktu dengan baik. Terus latih disiplin dan hindari prokrastinasi ya!';
    } else {
      message = 'Tetap Semangat! Mempelajari manajemen waktu adalah proses bertahap. Kamu bisa membaca ulang materi di atas dan mengulangi kuis ini.';
    }

    if (feedbackMsg) feedbackMsg.textContent = message;

    if (breakdownEl) {
      breakdownEl.innerHTML = `
        <div class="breakdown-item" style="border-left: 3px solid var(--success);">
          <span class="breakdown-num" style="color: var(--success);">${correctCount}</span>
          <span class="breakdown-label">Jawaban Benar</span>
        </div>
        <div class="breakdown-item" style="border-left: 3px solid var(--danger);">
          <span class="breakdown-num" style="color: var(--danger);">${totalCount - correctCount}</span>
          <span class="breakdown-label">Jawaban Salah</span>
        </div>
      `;
    }
  }

  function restartQuiz() {
    appState.quizCurrentIndex = 0;
    appState.quizScore = 0;
    appState.quizSelectedAnswer = null;
    appState.quizAnswered = false;
    appState.quizUserAnswers = [];
    renderCurrentQuestion();
    showToast('Kuis diulang dari pertanyaan pertama.', 'info');
  }

  /* ==========================================================================
     11. NAVIGATION & SCROLL HIGHLIGHT
     ========================================================================== */
  function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    // Toggle mobile menu
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        } else {
          navMenu.classList.add('open');
          navToggle.classList.add('open');
          navToggle.setAttribute('aria-expanded', 'true');
        }
      });

      // Close menu when clicking link
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Header elevation on scroll
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (header) {
        if (scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Back to top button visibility / behavior
      if (backToTopBtn) {
        if (scrollY > 400) {
          backToTopBtn.style.opacity = '1';
        } else {
          backToTopBtn.style.opacity = '0.85';
        }
      }
    });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Active Section ScrollSpy using IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -70% 0px'
      });

      sections.forEach(sec => observer.observe(sec));
    }

    // Keyboard support: Escape key closes any open modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMateriModal();
        closeEditModal();
        closeConfirmModal();
      }
    });
  }

  /* ==========================================================================
     12. APPLICATION INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    loadInitialData();
    initNavigation();
    initMateriSection();
    initPlannerSection();
    initIllustrationClock();
    initFocusTimer();
    initQuiz();
    updateDashboardStats();
  });

})();
