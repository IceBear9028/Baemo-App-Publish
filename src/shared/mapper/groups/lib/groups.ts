export interface GroupsItemResponse {
  clubsId: number;
  name: string;
  simpleDescription: string;
  location: string;
  memberCount: number;
  backgroundImagePath: string;
  profileImagePath: string;
  // limitHeadCount: number;
}

export type GroupsResponse = GroupsItemResponse[];

export class Groups {
  groupsId: number;
  groupsName: string;
  groupsDescription: string;
  region: string[];
  startDate: string;
  headCount: number;
  limitHeadCount: number;
  location: string;
  gatheringThumbnail: string;
  background: string;
  constructor(groupItemRes: GroupsItemResponse) {
    this.groupsId = groupItemRes.clubsId;
    this.groupsName = groupItemRes.name;
    this.groupsDescription = groupItemRes.simpleDescription;
    this.headCount = groupItemRes.memberCount;
    this.location = groupItemRes.location;
    this.background = groupItemRes.backgroundImagePath;
    this.gatheringThumbnail = groupItemRes.profileImagePath;

    // 현재 API 에 비어있는 속성들
    this.region = [];
    this.startDate = '';
    this.limitHeadCount = 0;
  }
}

//MOCKUP 데이터 전용
interface GroupsItemResponse_TEMP {
  groupsId: number;
  groupsName: string;
  groupsDescription: string;
  region: string[];
  startDate: string;
  headCount: number;
  limitHeadCount: number;
  location: string;
  gatheringThumbnail: string;
}

export type GroupsResponse_TEMP = GroupsItemResponse_TEMP[];

//MOCKUP 데이터 전용
export class Groups_TEMP {
  groupsId: number;
  groupsName: string;
  groupsDescription: string;
  region: string[];
  startDate: string;
  headCount: number;
  limitHeadCount: number;
  location: string;
  gatheringThumbnail: string;
  constructor(groupItemRes: GroupsItemResponse_TEMP) {
    this.groupsId = groupItemRes.groupsId;
    this.groupsName = groupItemRes.groupsName;
    this.groupsDescription = groupItemRes.groupsDescription;
    this.region = groupItemRes.region;
    this.startDate = groupItemRes.startDate;
    this.headCount = groupItemRes.headCount;
    this.limitHeadCount = groupItemRes.limitHeadCount;
    this.location = groupItemRes.location;
    this.gatheringThumbnail = groupItemRes.gatheringThumbnail;
  }
}

//MOCKUP 데이터 전용
export class GroupsList_TEMP {
  readonly groupsList: Groups_TEMP[];
  readonly groupsCount: number;

  constructor(response: GroupsItemResponse_TEMP[]) {
    this.groupsList = response.map(item => ({
      groupsId: item.groupsId,
      groupsName: item.groupsName,
      groupsDescription: item.groupsDescription,
      region: item.region,
      startDate: item.startDate,
      headCount: item.headCount,
      limitHeadCount: item.limitHeadCount,
      location: item.location,
      gatheringThumbnail: item.gatheringThumbnail,
    }));
    this.groupsCount = response.length;
  }
}
