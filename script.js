const webhookURL = "https://n8n.drmoon.xyz/webhook/lead";

const form = document.getElementById("leadForm");
const status = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";
    status.innerHTML = "";

    const data = {

        fullName: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        company: document.getElementById("company").value.trim(),

        requirement: document.getElementById("requirement").value.trim()

    };

    try {

        const response = await fetch(webhookURL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const result = await response.json();

        if (result.success) {

            status.innerHTML = `
                <div style="
                    background:#dcfce7;
                    color:#166534;
                    padding:18px;
                    border-radius:10px;
                    margin-top:20px;
                    font-weight:600;
                ">
                    ✅ ${result.message}
                </div>
            `;

            form.reset();

        } else {

            status.innerHTML = `
                <div style="
                    background:#fee2e2;
                    color:#991b1b;
                    padding:18px;
                    border-radius:10px;
                    margin-top:20px;
                    font-weight:600;
                ">
                    ❌ ${result.message}
                </div>
            `;

        }

    }

    catch (error) {

        console.error(error);

        status.innerHTML = `
            <div style="
                background:#fee2e2;
                color:#991b1b;
                padding:18px;
                border-radius:10px;
                margin-top:20px;
                font-weight:600;
            ">
                ❌ Unable to connect with the server.<br>
                Please try again later.
            </div>
        `;

    }

    submitBtn.disabled = false;

    submitBtn.innerText = "Send Request";

});