function sendLocationToSheet() {
  if (!navigator.geolocation) {
    alert("このブラウザでは位置情報が取得できません。");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const baseURL = "https://script.google.com/macros/s/AKfycbwHAkPzZDyn8ErEDltrF-YLw2AyCJTYOe7xS970uOuuppuL2i6SXrYak3NIr0FwiQdvLQ/exec";

      const params = new URLSearchParams({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: new Date().toISOString()
      });

      fetch(`${baseURL}?${params.toString()}`)
        .then(res => res.json())
        .then(result => {
          if (result.result === "success") {
            console.log("✅ 位置情報送信成功");
            window.location.href = "show.html";
          } else {
            console.error("❌ エラー:", result.message);
            alert("送信に失敗しました：" + result.message);
          }
        })
        .catch(error => {
          console.error("❌ 通信失敗:", error);
          alert("位置情報の送信に失敗しました。");
        });
    },
    (error) => {
      console.error("位置情報取得失敗:", error);
      alert("位置情報の取得に失敗しました。");
    }
  );
}

document.getElementById("start-btn")?.addEventListener("click", sendLocationToSheet);

function appendMessage(name, message, myName) {
  const chatWindow = document.getElementById("chat-window");
  const div = document.createElement("div");
  div.className = "message " + (name === myName ? "you" : "other");
  div.innerText = `${name}: ${message}`;
  chatWindow.appendChild(div);
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const params = new URLSearchParams({
    name: name,
    message: message
  });

  try {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyR7n4clcdn4MLNtZdt4bnpKfLEl0Wed27hD_9Ca5bqRvMfZXjJ8VmZ1tcYqT_cce-n9w/exec`);
    const data = await res.json();
    console.log("✅送信成功:", data);
    // 再読み込み or 手動で表示更新
  } catch (err) {
    console.error("❌送信失敗:", err);
  }
});
