import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validação básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Verificar se a API key existe
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY não configurada")
      return NextResponse.json({ error: "Serviço de email não configurado" }, { status: 500 })
    }

    // Inicializar Resend apenas quando necessário
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Criar email HTML profissional
    const emailHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nova Mensagem - GV Software</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header com gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                ✉️ Nova Mensagem Recebida
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                GV Software - gvsoftware.tech
              </p>
            </td>
          </tr>

          <!-- Conteúdo -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Nome do Cliente -->
              <div style="margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 8px; border-left: 4px solid #6366f1;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  👤 Nome do Cliente
                </p>
                <p style="margin: 0; color: #111827; font-size: 18px; font-weight: 600;">
                  ${name}
                </p>
              </div>

              <!-- Email -->
              <div style="margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 8px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  📧 Email
                </p>
                <p style="margin: 0;">
                  <a href="mailto:${email}" style="color: #2563eb; font-size: 16px; font-weight: 500; text-decoration: none;">
                    ${email}
                  </a>
                </p>
              </div>

              <!-- Assunto -->
              <div style="margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 8px; border-left: 4px solid #8b5cf6;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  📋 Assunto
                </p>
                <p style="margin: 0; color: #111827; font-size: 16px; font-weight: 600;">
                  ${subject}
                </p>
              </div>

              <!-- Mensagem -->
              <div style="margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  💬 Mensagem
                </p>
                <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
${message}
                </p>
              </div>

              <!-- Botão de Ação -->
              <div style="text-align: center; margin-top: 35px;">
                <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);">
                  📧 Responder Cliente
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">
                Esta mensagem foi enviada pelo formulário de contato do site
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                <strong style="color: #6366f1;">GV Software</strong> • 
                <a href="https://gvsoftware.tech" style="color: #3b82f6; text-decoration: none;">gvsoftware.tech</a> • 
                (17) 99785-3416
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    // Enviar email
    const data = await resend.emails.send({
      from: "GV Software <contato@gvsoftware.tech>",
      to: ["contato.gvsoftware@gmail.com"],
      replyTo: email,
      subject: `[CONTATO] ${subject} - ${name}`,
      html: emailHtml,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    })

    return NextResponse.json({ message: "Email enviado com sucesso!", data }, { status: 200 })
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return NextResponse.json({ error: "Erro ao enviar email" }, { status: 500 })
  }
}
