console.log('Hello!'); //一行コメント
/*複数行にわたるコメント*/
/*
・ランダムなテキストを表示する機能
・キー入力の判定ができる機能
・タイピングスキルのランクを判定する機能
・ゲームを終了する機能
・カウントダウンタイマーの機能
*/

// 必要なHTML要素の取得
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

// 複数のテキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android','programming'
];

let checkTexts = []; // 入力されたキー判別用の配列を用意

let score = 0;  //スコアの初期値を設定

// ランダムなテキストを画面に表示する関数式
const createText = () => {
    const p = document.getElementById('text');

    // 配列のインデックス数からランダムな数値を生成する
    const rnd = Math.floor(Math.random() * textLists.length);

    // ランダムなテキストをp要素に挿入
    // p.textContent = textLists[rnd];
    // 配列の[0]番目にあるテキストを画面に表示
    // p.textContent = textLists[0];

    // p要素の中身を空にする
    p.textContent = '';
    // 画面に表示するテキスト情報をcheckTexts配列に格納
    checkTexts = textLists[rnd].split('').map(value => {
    // テキストを1文字ずつに分割してp要素に挿入する
    //textLists[rnd].split('').map(value => {

        // span要素を生成する
        const span = document.createElement('span');
        // span要素に配列の1文字ずつを当てはめる
        span.textContent = value;
        // span要素をp要素に追加していく
        p.appendChild(span);
        //p.appendChile(value);
        return span; // 1文字ずつcheckTextsに格納
    })
};

// キーイベント＆入力判定処理の関数式
const keyDown = e => {
    //console.log(checkTexts); // 入力されたキーが何かを確認
    if(e.key === checkTexts[0].textContent){
        //console.log('正しい入力です');
        checkTexts[0].className = 'add-color'; // add-colorクラスを付与
        checkTexts.shift(); // 配列から1文字を削除(常に0番目の要素を削除)
        score++; // 正しい入力の時だけスコアを加算
        // 最後まで入力したら新しいテキストを用意
        // 配列の中身が0になった時点でcreateText()関数が実行
        if(!checkTexts.length) createText();
    } else if(e.key === 'Shift') { // Shiftキーを押した時は色が変わらない
        wrap.style.backgroundColor = '#666'; 
    } else { // タイプミスした時だけ背景色を赤色に変える
        wrap.style.backgroundColor = 'red'; 
    }
};

// ランク判定とメッセージ生成処理の関数式
const rankCheck = rank => {
    let text ='';

    if(score < 100) {
        text = `貴方のランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
        text = `貴方のランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if(score < 300) {
        text = `貴方のランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else if(score >= 300) {
        text = `貴方のランクはSです。\nおめでとうございます！`;
    }
    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;
    //return `${score}文字打てました！`;　// スコアの値を返す、`` で囲む
};

// ゲームの終了処理の関数式
const gameOver = id => {
    clearInterval(id); // タイマーをストップする
    // スコアの値をrankCheck()に渡してダイアログで結果を表示
    //confirm()で作成したダイアログは【OK】ボタンをクリックすると返り値としてtrueを取得できます。
    //そのため、if文を使いtrueの場合だけブラウザをリロードするように記述
    const result = confirm(rankCheck(score));
    if(result) window.location.reload(); // OKボタンをクリックされたらリロード
    //console.log('ゲーム終了！');
};

// タイマー処理の関数式
const timer = () => {
    let time = 60; // タイマーの初期値を設定（60秒）
    const count = document.getElementById('count'); // タイマー要素を取得
    const id = setInterval(() => { // 1秒ごとに処理実行
        //if(time <= 0) clearInterval(id); // カウントが0になったらタイマーを停止
        if(time <= 0) gameOver(id); // カウントが0になったらタイマーのIDをgameOver()に渡す
        count.textContent = time--; // タイマーの表示を1ずつ減らしていく
    }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
    timer(); // タイマー関数を実行
    createText(); // createText関数を実行,ランダムなテキストを表示
    start.style.display = 'none'; // 一度クリックしたら「スタート」ボタンを非表示にする処理
    document.addEventListener('keydown', keyDown); // キーボードのイベント処理
});
