document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const people = document.getElementById("people").value;
    const date = document.getElementById("date").value;

    const services = Array.from(document.querySelectorAll('input[name="services"]:checked'))
        .map(el => el.value);

    const comment = document.getElementById("comment").value;

    let message = `
📝 Buyurtma:
👤 Ism: ${name}
📞 Telefon: ${phone}
👥 Odam soni: ${people}
📅 Sana: ${date}
✅ Xizmatlar: ${services.join(", ")}
💬 Izoh: ${comment}
`;

    const token = "8329478316:AAHUI4Tg8cTOG7A9k9xkA0CbjOaXLvKVGKs";
    const chat_id = "-1003140791285";

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chat_id,
            text: message
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Natija:", data);
        if (data.ok) {
            alert("✅ Buyurtma yuborildi");
            document.getElementById("bookingForm").reset();
        } else {
            alert("❌ Xatolik: " + data.description);
        }
    })
    .catch(err => {
        console.error("Xatolik:", err);
        alert("Internet yoki bot xatosi");
    });
});
