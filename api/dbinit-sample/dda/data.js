import moment from "moment";

function getTime(day = 0, second = 0) {
  return moment()
    .add(day, "days")
    .add(second, "seconds")
    .format("YYYY.MM.DD HH:mm:ss");
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq("user"),
        email: "admin@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "무지",
        phone: "01011112222",
        address: "서울시 강남구 역삼동 123",
        type: "admin",
        loginType: "email",
        image: `/files/${clientId}/user-muzi.webp`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: "03-23",
          membershipClass: "MC03",
          addressBook: [
            {
              id: 1,
              name: "집",
              value: "서울시 강남구 역삼동 123",
            },
            {
              id: 2,
              name: "회사",
              value: "서울시 강남구 신사동 234",
            },
          ],
        },
      },
      {
        _id: await nextSeq("user"),
        email: "s1@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "네오",
        phone: "01022223333",
        address: "서울시 강남구 삼성동 456",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/user-neo.webp`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: "11-23",
          membershipClass: "MC01",
          addressBook: [
            {
              id: 1,
              name: "회사",
              value: "서울시 강남구 삼성동 567",
            },
            {
              id: 2,
              name: "학교",
              value: "서울시 강남구 역삼동 234",
            },
          ],
        },
      },
      {
        _id: await nextSeq("user"),
        email: "s2@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "어피치",
        phone: "01033334444",
        address: "서울시 강남구 도곡동 789",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/user-apeach.webp`,
        createdAt: getTime(-40, -60 * 30),
        updatedAt: getTime(-30, -60 * 20),
        extra: {
          confirm: false, // 관리자 승인이 안됨
          birthday: "11-24",
          membershipClass: "MC02",
          addressBook: [
            {
              id: 1,
              name: "회사",
              value: "서울시 마포구 연희동 123",
            },
            {
              id: 2,
              name: "가게",
              value: "서울시 강남구 학동 234",
            },
          ],
        },
      },
      {
        _id: await nextSeq("user"),
        email: "u1@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "제이지",
        phone: "01044445555",
        address: "서울시 강남구 논현동 222",
        type: "user",
        loginType: "email",
        image: `/files/${clientId}/user-jayg.webp`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          birthday: "11-30",
          membershipClass: "MC02",
          address: [
            {
              id: 1,
              name: "회사",
              value: "서울시 강동구 천호동 123",
            },
            {
              id: 2,
              name: "집",
              value: "서울시 강동구 성내동 234",
            },
          ],
        },
      },
    ],
    // 상품
    product: [
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 90000,
        shippingFees: 0,
        show: true,
        active: true,
        name: "기장대게 할인마트 홀 서빙 대타 구함!",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/gijang.jpg`,
            name: "gijang.jpg",
            originalname: "기장대게할인마트.jpg",
          },
        ],
        content: `
          <div class="product-detail">
            <p>기장대게 할인마트에서 12/19 목요일 하루 홀 서빙해주실 대타분을 구합니다. 점심식사는 가게에서 제공합니다.</p>
          </div>`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          state: "EM010",
          location: [35.155625, 129.131793],
          address: "부산광역시 수영구 광안해변로358번길 8 1층",
          condition: {
            company: "기장대게할인마트",
            workTime: ["10:00", "18:00"],
            date: "2025-01-31",
          },
          worker: {
            userId: null,
            orderId: null,
          },
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 80000,
        shippingFees: 0,
        show: true,
        active: true,
        name: "소문난손칼국수 점심 설거지 해주실 분",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/somoon.jpg`,
            name: "somoon.jpg",
            originalname: "소문난손칼국수.jpg",
          },
        ],
        content: `
          <div class="product-detail">
            <p>점심타임 설거지 해주실 분 구합니다. 경력 상관 없음</p>
          </div>`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          state: "EM010",
          location: [35.154435, 129.065956],
          address: "부산광역시 부산진구 서전로58번길 78",
          condition: {
            company: "소문난손칼국수",
            workTime: ["11:00", "16:00"],
            date: "2025-01-31",
          },
          worker: {
            userId: null,
            orderId: null,
          },
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 100000,
        shippingFees: 0,
        show: true,
        active: true,
        name: "올리브영 일일 MATE 구합니다",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/olive.jpg`,
            name: "olive.jpg",
            originalname: "올리브영.jpg",
          },
        ],
        content: `
          <div class="product-detail">
            <p>올리브영 일일 MATE 구합니다. 화장품 관심 많으신 분 우대해요.</p>
          </div>`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          state: "EM010",
          location: [37.563983, 126.985161],
          address: "서울특별시 중구 명동1가 9-9",
          condition: {
            company: "올리브영명동타운",
            workTime: ["10:00", "18:00"],
            date: "2025-01-31",
          },
          worker: {
            userId: null,
            orderId: null,
          },
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 80000,
        shippingFees: 0,
        show: true,
        active: true,
        name: "카카오 본사에서 프론트엔드 개발자 구합니다.",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/kakao.jpeg`,
            name: "kakao.jpeg",
            originalname: "카카오.jpeg",
          },
        ],
        content: `
          <div class="product-detail">
            <p>카카오 프렌즈 홈페이지 UI 작업</p>
            <p>카카오뱅크 신사업 분야의 프론트엔드 개발과 운영</p>
            <p>서비스 운영도구 개발 및 관리 효율화 업무</p>
            <p>채용시 연락</p>
          </div>`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          state: "EM010",
          location: [33.500893, 126.530108],
          address: "동광로,제주특별자치도 제주시",
          condition: {
            company: "카카오",
            workTime: ["09:00", "17:00"],
            date: "2025-01-31",
          },
          worker: {
            userId: null,
            orderId: null,
          },
        },
      },
    ],
    // 코드
    code: [
      {
        _id: "orderState",
        title: "주문 상태",
        codes: [
          {
            sort: 1,
            code: "WO010",
            value: "지원 완료",
          },
          {
            sort: 2,
            code: "WO020",
            value: "채택 완료",
          },

          {
            sort: 3,
            code: "WO030",
            value: "입금 완료",
          },
          {
            sort: 4,
            code: "WO040",
            value: "리뷰 작성 완료",
          },
          {
            sort: 5,
            code: "EM010",
            value: "구인 중",
          },
          {
            sort: 6,
            code: "EM020",
            value: "구인 완료",
          },
          {
            sort: 7,
            code: "EM030",
            value: "송금 완료",
          },
          {
            sort: 8,
            code: "EM040",
            value: "리뷰 작성 완료",
          },
        ],
      },
    ],
  };
};
