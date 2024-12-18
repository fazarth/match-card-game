let jumlahKartu = 10;
let kartuPertama = (kartuKedua = 0);
let timer;
let waktu = 60; // Timer 60 detik
let timerMulai = false; // Flag untuk menandai apakah timer sudah dimulai

function buatAngka() {
  let angkaBerurut = [];

  for (let i = 1; i <= jumlahKartu; i++) {
    angkaBerurut.push(i, i);
  }

  return angkaBerurut;
}

function acakAngka(angkaBerurut) {
  let angkaAcak = angkaBerurut.sort(function () {
    return 0.5 - Math.random();
  });

  return angkaAcak;
}

function persiapkanKartu(angkaAcak) {
  let str = "";

  angkaAcak.forEach(function (i) {
    str +=
      '<div class="kartu" nilai="' +
      i +
      '">' +
      '<div class="belakang">' +
      i +
      "</div>" +
      '<div class="depan">wegodev</div>' +
      "</div>";
  });

  $("#game").append(str);
}

function pengendali() {
  $(".kartu").on("click", function () {
    // Cegah klik pada kartu yang sudah dibuka atau benar
    if ($(this).hasClass("buka") || $(this).hasClass("betul")) {
      return;
    }

    // Jika ini adalah klik pertama, mulai timer
    if (!timerMulai) {
      mulaiTimer(); // Mulai timer saat kartu pertama diklik
      timerMulai = true; // Tandai bahwa timer sudah dimulai
    }

    $(this).addClass("buka");

    if (kartuPertama == 0) {
      kartuPertama = $(this).attr("nilai");
      console.log("kartu pertama : " + kartuPertama);
    } else {
      kartuKedua = $(this).attr("nilai");
      console.log("kartu kedua : " + kartuKedua);

      if (kartuPertama == kartuKedua) {
        console.log("benar");
        $(".buka").addClass("betul").css("background-color", "green");
        $(".betul").removeClass("buka");
        kartuPertama = kartuKedua = 0;
      } else {
        console.log("salah");
        kartuPertama = kartuKedua = 0;
        $(this).one("transitionend", function () {
          $(".kartu").removeClass("buka");
        });
      }
    }

    // Periksa apakah semua kartu telah terbuka (menang)
    cekKemenangan();
  });
}

function cekKemenangan() {
  // Jika jumlah kartu yang memiliki class 'betul' sama dengan jumlah kartu
  if ($(".betul").length === jumlahKartu * 2) {
    setTimeout(function () {
      alert("You Win!"); // Tampilkan pesan kemenangan
      resetGame(); // Reset game setelah menang
    }, 500); // Delay sedikit agar animasi selesai terlebih dahulu
  }
}

function mulaiTimer() {
  timer = setInterval(function () {
    if (waktu <= 0) {
      clearInterval(timer);
      alert("Time Out!"); // Tampilkan notifikasi Time Out
      resetGame(); // Reset game jika waktu habis
    } else {
      $("#timer").text(waktu + " s");
      waktu--;
    }
  }, 1000);
}

function resetGame() {
  // Reset permainan
  $(".kartu").removeClass("buka betul");
  waktu = 60; // Reset timer ke 60 detik
  $("#timer").text(waktu + " s");
  let angkaBerurut = buatAngka();
  let angkaAcak = acakAngka(angkaBerurut);
  $("#game").empty(); // Hapus kartu yang ada
  persiapkanKartu(angkaAcak); // Persiapkan kartu baru
  timerMulai = false; // Reset flag timerMulai
}

$(document).ready(function () {
  let angkaBerurut = buatAngka();
  let angkaAcak = acakAngka(angkaBerurut);

  persiapkanKartu(angkaAcak);
  // Pengendali dimulai setelah persiapan kartu
  pengendali();

  // Tambahkan elemen timer di bawah teks judul game
  // Tidak perlu menambah elemen timer lagi karena sudah ada di HTML
});
