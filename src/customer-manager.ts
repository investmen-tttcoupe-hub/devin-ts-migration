// 顧客データの型
interface Customer {
    name: string;
    email: string;
    phone: string;
}

// 顧客データを保存する配列（グローバル変数）
let customers: Customer[] = [];

// 顧客追加関数
function addCustomer(): void {
    // 入力値を取得
    const name: string = (document.getElementById("name") as HTMLInputElement).value;
    const email: string = (document.getElementById("email") as HTMLInputElement).value;
    const phone: string = (document.getElementById("phone") as HTMLInputElement).value;

    // メッセージをクリア
    (document.getElementById("message") as HTMLElement).textContent = "";

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
    const customer: Customer = {
        name: name,
        email: email,
        phone: phone
    };

    // 配列に追加
    customers.push(customer);

    // 入力フォームをクリア
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("email") as HTMLInputElement).value = "";
    (document.getElementById("phone") as HTMLInputElement).value = "";

    // 成功メッセージを表示
    const messageDiv = document.getElementById("message") as HTMLElement;
    messageDiv.textContent = "✅ " + name + " さんを登録しました（登録数: " + customers.length + "）";
    messageDiv.className = "message success";

    // テーブルを更新
    displayCustomers();

    console.log("顧客を登録しました:", customer);
}

// 顧客リストをテーブルに表示する関数
function displayCustomers(): void {
    const tableBody = document.getElementById("customerList") as HTMLElement;

    // テーブルをクリア
    tableBody.innerHTML = "";

    // 顧客データが空の場合
    if (customers.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='3' style='text-align:center; color:#999;'>登録されている顧客はいません</td></tr>";
        return;
    }

    // 全顧客データをループ処理
    customers.forEach(function(customer: Customer): void {
        const row: string = "<tr>" +
                "<td>" + customer.name + "</td>" +
                "<td>" + customer.email + "</td>" +
                "<td>" + customer.phone + "</td>" +
                "</tr>";

        tableBody.innerHTML += row;
    });
}

// 顧客検索関数
function searchCustomer(): void {
    // 検索ボックスの値を取得
    const searchName: string = (document.getElementById("searchName") as HTMLInputElement).value;

    // 検索キーワードが空の場合
    if (searchName === "") {
        alert("検索する名前を入力してください");
        return;
    }

    // filter()で条件に合う顧客を抽出
    const filteredCustomers: Customer[] = customers.filter(function(customer: Customer): boolean {
        return customer.name.includes(searchName);
    });

    // 検索結果が0件の場合
    if (filteredCustomers.length === 0) {
        alert("「" + searchName + "」に一致する顧客が見つかりませんでした");
        return;
    }

    // テーブルをクリア
    const tableBody = document.getElementById("customerList") as HTMLElement;
    tableBody.innerHTML = "";

    // 検索結果をテーブルに表示
    filteredCustomers.forEach(function(customer: Customer): void {
        const row: string = "<tr>" +
                "<td>" + customer.name + "</td>" +
                "<td>" + customer.email + "</td>" +
                "<td>" + customer.phone + "</td>" +
                "</tr>";

        tableBody.innerHTML += row;
    });

    console.log("検索結果:", filteredCustomers.length + "件");
}

// 全件表示関数
function showAllCustomers(): void {
    displayCustomers();
    (document.getElementById("searchName") as HTMLInputElement).value = "";
}

// ページ読み込み時に初期表示
displayCustomers();

console.log("顧客管理ツールを起動しました");
