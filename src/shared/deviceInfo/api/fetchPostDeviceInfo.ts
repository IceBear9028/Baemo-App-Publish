import {apiRequest} from '~/shared/fetch';

/** ### DeviceInfo
 * #### 정보
 * ```json
 * {
 *   uniqueId: 유저별 디바이스 고유 id
 *   token: 디바이스별 Firebase 고유 코드
 *   name: 디바이스 이름
 *   type: 디바이스 종류 (예시 : TV, Tablet 등)
 *   model: 디바이스 모델 (예시 : iphone14 등)
 *   brand: 디바이스 제조 브랜드
 * }
 * ```
 */
export interface DeviceInfo {
  uniqueId: string;
  token: string;
  name: string;
  type: string;
  model: string;
  brand: string;
}

export async function fetchPostDeviceInfo(req: DeviceInfo) {
  console.log('----->', req);
  const {data} = await apiRequest('api/users/device', 'post', req);
  return {...data};
}
