export async function onRequestPost(context) {
  try {
    const form = await context.request.formData();
    const payload = {
      problem: form.get("problem") || "",
      timing: form.get("timing") || "",
      location: form.get("location") || "",
      symptom: form.get("symptom") || "",
      name: form.get("name") || "",
      phone: form.get("phone") || "",
      email: form.get("email") || "",
      zip: form.get("zip") || "",
      description: form.get("description") || ""
    };

    if (!payload.name || !payload.phone || !payload.email || !payload.zip) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "content-type": "application/json" }
      });
    }

    const html = `
      <h2>New WetYard help request</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>ZIP:</strong> ${escapeHtml(payload.zip)}</p>
      <p><strong>Problem:</strong> ${escapeHtml(payload.problem)}</p>
      <p><strong>When:</strong> ${escapeHtml(payload.timing)}</p>
      <p><strong>Where:</strong> ${escapeHtml(payload.location)}</p>
      <p><strong>Symptom:</strong> ${escapeHtml(payload.symptom)}</p>
      <p><strong>Description:</strong><br>${escapeHtml(payload.description).replace(/\n/g,"<br>")}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + context.env.RESEND_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: context.env.WETYARD_FROM_EMAIL || "WetYard <leads@wetyard.com>",
        to: [context.env.WETYARD_LEAD_EMAIL || "Scottspoolservice2014@gmail.com"],
        reply_to: payload.email,
        subject: "WetYard help request — " + payload.zip,
        html
      })
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ ok: false, error: "Email delivery failed" }), {
        status: 502,
        headers: { "content-type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: "Unexpected error" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
