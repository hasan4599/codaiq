interface DomainCheckRequest {
  extension: string;
  name: string;
}

interface DomainCheckResult {
  domain: string;
  status: string;
  price?: {
    product: string;
    price: number;
    currency: string;
  };
}

interface OpenProviderDomainCheckResponse {
  code: number;
  desc: string;
  data: {
    results: DomainCheckResult[];
  };
}

export async function checkDomains(
  token: string,
  domains: DomainCheckRequest[],
  with_price = true
): Promise<OpenProviderDomainCheckResponse> {
  const response = await fetch('https://api.openprovider.eu/v1beta/domains/check', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      domains,
      with_price,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to check domains: ${errorText}`);
  }

  const data: OpenProviderDomainCheckResponse = await response.json();
  return data;
}
