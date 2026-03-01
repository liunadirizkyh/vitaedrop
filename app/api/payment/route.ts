import { NextResponse } from "next/server";
import midtransClient from "midtrans-client"; // Error di sini akan hilang berkat global.d.ts

export async function POST(request: Request) {
  try {
    // 1. Ambil data dari request frontend
    const body = await request.json();
    const { order_id, gross_amount, customer_name } = body;

    // 2. Inisialisasi Midtrans Snap (Gunakan const, bukan let)
    // Alternatif jika masih merah: paksa jadikan tipe 'any'
    const snap = new midtransClient.Snap({
      isProduction: true,
      serverKey: process.env.MIDTRANS_SERVER_KEY || "",
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
    } as any);

    // 3. Siapkan parameter transaksi (Gunakan const, bukan let)
    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: gross_amount,
      },
      customer_details: {
        first_name: customer_name,
      },
    };

    // 4. Minta token ke Midtrans
    const transaction = await snap.createTransaction(parameter);

    // 5. Kembalikan token ke frontend
    return NextResponse.json({ token: transaction.token });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { error: "Gagal membuat transaksi" },
      { status: 500 },
    );
  }
}
