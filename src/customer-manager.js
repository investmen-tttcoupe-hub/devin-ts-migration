// 顧客データを保存する配列（グローバル変数）
let customers = [];

// 顧客追加関数
function addCustomer() {
    // 入力値を取得
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    // メッセージをクリア
    document.getElementById("message").textContent = "";

    // 必須チェック
    if (name === "") {
        alert("お名前を入力してください");
        return;
    }

    if (email === "") {
        alert("メールアドレスを入力してください");
        return;
    }

    if (phone === "") {
        alert("電話番号を入力してください");
        return;
    }

    // メールアドレスの形式チェック
    if (!email.includes("@")) {
        alert("メールアドレスの形式が正しくありません");
        return;
    }

    // オブジェクトを作成
    let customer = {
        name: name,
        email: email,
        phone: phone
    };

    // 配列に追加
    customers.push(customer);

    // 入力フォームをクリア
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    // 成功メッセージを表示
    let messageDiv = document.getElementById("message");
    messageDiv.textContent = "✅ " + name + " さんを登録しました（登録数: " + customers.length + "）";
    messageDiv.className = "message success";

    // テーブルを更新
    displayCustomers();

    console.log("顧客を登録しました:", customer);
}

// 顧客リストをテーブルに表示する関数
function displayCustomers() {
    let tableBody = document.getElementById("customerList");

    // テーブルをクリア
    tableBody.innerHTML = "";

    // 顧客データが空の場合
    if (customers.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='3' style='text-align:center; color:#999;'>登録されている顧客はいません</td></tr>";
        return;
    }

    // 全顧客データをループ処理
    customers.forEach(function(customer) {
        let row = "<tr>" +
                "<td>" + customer.name + "</td>" +
                "<td>" + customer.email + "</td>" +
                "<td>" + customer.phone + "</td>" +
                "</tr>";

        tableBody.innerHTML += row;
    });
}

// 顧客検索関数
function searchCustomer() {
    // 検索ボックスの値を取得
    let searchName = document.getElementById("searchName").value;

    // 検索キーワードが空の場合
    if (searchName === "") {
        alert("検索する名前を入力してください");
        return;
    }

    // filter()で条件に合う顧客を抽出
    let filteredCustomers = customers.filter(function(customer) {
        return customer.name.includes(searchName);
    });

    // 検索結果が0件の場合
    if (filteredCustomers.length === 0) {
        alert("「" + searchName + "」に一致する顧客が見つかりませんでした");
        return;
    }

    // テーブルをクリア
    let tableBody = document.getElementById("customerList");
    tableBody.innerHTML = "";

    // 検索結果をテーブルに表示
    filteredCustomers.forEach(function(customer) {
        let row = "<tr>" +
                "<td>" + customer.name + "</td>" +
                "<td>" + customer.email + "</td>" +
                "<td>" + customer.phone + "</td>" +
                "</tr>";

        tableBody.innerHTML += row;
    });

    console.log("検索結果:", filteredCustomers.length + "件");
}

// 全件表示関数
function showAllCustomers() {
    displayCustomers();
    document.getElementById("searchName").value = "";
}

// ページ読み込み時に初期表示
displayCustomers();

console.log("顧客管理ツールを起動しました");
