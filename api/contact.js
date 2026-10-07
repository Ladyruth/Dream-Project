export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, email, concern, message } = req.body;

    if (!firstName || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Send email using Resend API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Digital knowledge space for women <onboarding@resend.dev>',
                reply_to: email, // When you click "Reply" in Gmail, it sends to the visitor!
                to: ['ezenecheruth@gmail.com'],
                subject: `New Contribution from ${firstName} (${concern})`,
                html: `
                    <h2>New Perspective Received</h2>
                    <p><strong>Name:</strong> ${firstName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Concern:</strong> ${concern}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `
            })
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            const data = await response.json();
            return res.status(500).json({ error: data.message || 'Failed to send email' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}
