$(function () {

	//ページ内スクロール
	$('a[href^="#"]').on("click", function () {
		var speed = 300; // スクロール速度（ミリ秒）
		var href = $(this).attr("href"); // リンク先のhrefを取得
		var target = $(href == "#" || href == "" ? "html" : href); // "#"か空ならhtmlタグをターゲットに
		var position = target.offset().top; // 対象の位置を取得
		$("html, body").animate(          // アニメーションでスクロール実行
			{
				scrollTop: position,     // 指定した位置までスクロール
			},
			speed,                       // スクロール速度
			"swing"                      // イージング（ゆっくり始まりゆっくり止まる）
		);
		return false; // デフォルトのリンク動作をキャンセル
	});

	// ページトップへ戻る
	var $pageTop = $(".c-page-top"); // トップボタンを変数に代入
	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) { // スクロール量が300pxを超えたら
			$pageTop.fadeIn();           // ボタンをフェードイン（表示）
		} else {
			$pageTop.fadeOut();          // それ以下ならフェードアウト（非表示）
		}
	});

	// 「ページトップへ戻る」ボタンがクリックされたときの処理
	$pageTop.on("click", function () {

		// ページ全体（bodyとhtml）を対象に、上（scrollTop: 0）までスムーズにスクロールする
		$("body,html").animate(
			{
				scrollTop: 0,  // 最上部までスクロール
			},
			300              // アニメーションの時間（ミリ秒）＝0.3秒
		);

		// デフォルトのリンク動作を無効にする（ページ遷移などを防ぐ）
		return false;
	});


	//スクロールに応じてヘッダーの背景色が変化
	$(window).scroll(function () {                            // ウィンドウがスクロールされたときに実行
		if ($(this).scrollTop() > 0) {                         // スクロール位置が0より大きい（＝スクロールされている）場合
			$(".l-header").addClass("is-active");              // ヘッダーにクラス「is-active」を追加（スタイルを変える）
		} else {                                               // スクロール位置が0（＝ページの一番上）に戻った場合
			$(".l-header").removeClass("is-active");           // ヘッダーからクラス「is-active」を削除
		}
	});

		//ハンバーガーメニュー( sp )
// メニューボタンとナビゲーションメニューを取得
const btnMenu   = $(".js-btn-menu");
const globalNav = $(".p-global-nav");

// メニューボタンクリック時の処理
btnMenu.on("click", function () {
	
	// ボタンのアクティブ状態を切り替え（見た目用クラス）
	btnMenu.toggleClass("is-active");
	
	// ナビゲーションメニューの表示／非表示を切り替え
	globalNav.toggleClass("is-show");

});
	
		$(document).on("click", function (e) {
			if (
				!$(e.target).closest($gnav).length &&
				!$(e.target).closest($btnMenu).length
			) {
				if ($gnav.hasClass("show")) {
					$gnav.removeClass("show");
					$btnMenu.toggleClass("active");
					$gnav.animate({ width: "toggle" }, 200);
				}
			}
		});		

});


//swiper
const swiper = new Swiper(".js-swiper-container", {
	// 自動再生の設定
	autoplay: {
		delay: 4000, // 4秒ごとに切り替え
	},

	// スライドの切り替えスピード（ミリ秒）
	speed: 1500,

	// スライドをループさせる
	loop: true,

	// スライドの切り替えエフェクト（フェードイン・アウト）
	effect: "fade",

	// ページネーション（●●●）
	pagination: {
		el: ".swiper-pagination",
	},

	// ナビゲーション矢印（次へ・前へ）
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	// スクロールバー
	scrollbar: {
		el: ".swiper-scrollbar",
	},
	
});


// ----------------------------------------------
// タイトルの文字を1文字ずつ<span>でラップする
// ----------------------------------------------
var title = document.querySelector('.p-hero__title');
title.innerHTML = title.textContent.replace(/\S/g, "<span class='text'>$&</span>");

// ----------------------------------------------
// サブタイトルを完全に透明化（非表示）にしてからラップ処理
// ----------------------------------------------
var subtitle = document.querySelector('.p-hero__subtitle');
subtitle.style.opacity = 0; // 最初は透明

// <br>などを除去し、テキストを1文字ずつ<span>でラップ
var subtitleText = subtitle.innerText;
subtitle.innerHTML = subtitleText.replace(/\S/g, "<span class='text'>$&</span>");

// ----------------------------------------------
// アニメーションのタイムラインを作成
// ----------------------------------------------
anime.timeline({ loop: false })

  // タイトルの文字を順番にフェードイン
  .add({
    targets: '.p-hero__title .text',
    opacity: [0, 1],
    easing: 'easeInOutQuad',
    duration: 125,                  // フェードインにかかる時間（ミリ秒）
    delay: (el, i) => 125 * i+ 1000      // 文字ごとの遅延（ミリ秒）← ここで500ms遅らせる
  })

  // サブタイトルの文字をタイトルのあとにフェードイン
  .add({
    targets: '.p-hero__subtitle .text',
    opacity: [0, 1],
    easing: 'easeInOutQuad',
    duration: 100,                 // フェードインにかかる時間
    delay: (el, i) => 100 * i,    // 文字ごとの遅延
    offset: '+=1000',              // タイトル完了後 500ms 後に開始

    // アニメーション開始時にサブタイトルの透明度を戻す
    begin: () => {
      subtitle.style.opacity = 1;
    }
  });
	

	
	
