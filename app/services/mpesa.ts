// services/mpesa.ts

interface MPESACredentials {
  consumerKey: string;
  consumerSecret: string;
  passkey: string;
  shortcode: string;
  callbackUrl: string;
}

interface STKPushRequest {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}

interface AccessTokenResponse {
  access_token: string;
  expires_in: string;
}

interface STKPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

interface TransactionStatusResponse {
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: string;
  ResultDesc: string;
}

export class MPESAService {
  private credentials: MPESACredentials;
  private baseUrl = "https://sandbox.safaricom.co.ke"; // Change to production URL when going live

  constructor(credentials: MPESACredentials) {
    this.credentials = credentials;
  }

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(
      `${this.credentials.consumerKey}:${this.credentials.consumerSecret}`,
    ).toString("base64");

    const response = await fetch(
      `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = (await response.json()) as AccessTokenResponse;
    return data.access_token;
  }

  private generateTimestamp(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    return `${year}${month}${day}${hour}${minute}${second}`;
  }

  private generatePassword(timestamp: string): string {
    const str = `${this.credentials.shortcode}${this.credentials.passkey}${timestamp}`;
    return Buffer.from(str).toString("base64");
  }

  public async initiateSTKPush({
    phoneNumber,
    amount,
    accountReference,
    transactionDesc,
  }: STKPushRequest): Promise<STKPushResponse> {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = this.generateTimestamp();
      const password = this.generatePassword(timestamp);

      const response = await fetch(
        `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            BusinessShortCode: this.credentials.shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: this.credentials.shortcode,
            PhoneNumber: phoneNumber,
            CallBackURL: this.credentials.callbackUrl,
            AccountReference: accountReference,
            TransactionDesc: transactionDesc,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`STK push failed: ${response.statusText}`);
      }

      const data = (await response.json()) as STKPushResponse;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`M-PESA STK Push failed: ${error.message}`);
      }
      throw new Error("M-PESA STK Push failed with unknown error");
    }
  }

  public async checkTransactionStatus(
    checkoutRequestId: string,
  ): Promise<TransactionStatusResponse> {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = this.generateTimestamp();
      const password = this.generatePassword(timestamp);

      const response = await fetch(
        `${this.baseUrl}/mpesa/stkpushquery/v1/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            BusinessShortCode: this.credentials.shortcode,
            Password: password,
            Timestamp: timestamp,
            CheckoutRequestID: checkoutRequestId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Transaction status check failed: ${response.statusText}`,
        );
      }

      const data = (await response.json()) as TransactionStatusResponse;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `M-PESA transaction status check failed: ${error.message}`,
        );
      }
      throw new Error(
        "M-PESA transaction status check failed with unknown error",
      );
    }
  }
}
