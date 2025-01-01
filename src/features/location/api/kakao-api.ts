import axios from 'axios';

export interface DocumentProps {
  x: string;
  y: string;
}

export function KakaoApi() {
  const BASE_URL = 'https://dapi.kakao.com/v2/local';

  async function convertAddrToXY(addr: string) {
    const response = await axios.get(`${BASE_URL}/search/address?query=${addr}`, {
      headers: {
        Authorization: 'KakaoAK 64a177e67bf0712697913b845b307d04',
      },
    });
    const result: DocumentProps = {
      x: response.data.documents[0].x,
      y: response.data.documents[0].y,
    };
    return result;
  }

  return {
    convertAddrToXY,
  };
}
