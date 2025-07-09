import { server } from "@/url";

const hosts = [
  {
    host: 'server',
    value: server
  }
]

type API =
  | 'get/user/all'
  | 'get/user/selected'
  | 'get/site/proxy'
  | 'get/dev/scan'
  | 'get/dev/file'
  | 'get/site/selected'
  | 'post/site/create'
  | 'post/dev/file/save'

async function Fetch({
  body,
  api,
  host,
  method,
  loading,
  params = '',
  formData = false
}: {
  body: any | any[];
  api: API;
  host: 'server';
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  loading: (v: boolean) => void;
  params?: string,
  formData?: boolean
}) {
  try {
    loading(true);
    const selectedHost = hosts.find((item) => item.host === host);
    if (!selectedHost) return null;

    const options: RequestInit = {
      method,
      cache: 'no-store'
    };

    if (method !== 'GET' && formData === false) {
      options.body = JSON.stringify(body);
    }

    if (method !== 'GET' && formData === true) {
      options.body = body;
    }
    const response = await fetch(`${selectedHost.value}/api/${api}${params ? "?" : ""}${params}`, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } finally {
    loading(false);
  }
}


export { Fetch }