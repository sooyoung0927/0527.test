const post = document.getElementById('new'); // 추가되는 덩어리
const postArray = {
  '어제 먹은 거': [],
  '오늘 먹을 거': [],
  '먹고 싶은 거': [],
};

const nav1 = document.getElementById('nav1');
const nav2 = document.getElementById('nav2');
const nav3 = document.getElementById('nav3');

const add = document.getElementById('fixed'); // + 버튼
const navigation = document.getElementById('navigation');
const nav = document.getElementById('nav'); // nav가 navigation의 부모

let currentCategory = null;

// 로컬스토리지에 정보 불러오기
const savedPosts = localStorage.getItem('postArray');
if (savedPosts) {
  // 저장된 내용이 있다면
  const parsed = JSON.parse(savedPosts); // 문자열로 바꿔서 저장
  for (const key in parsed) {
    // 저장된 정보들을
    postArray[key] = parsed[key]; // 배열에 넣음 (배열에 저장)
  }
}

// 게시글 보여주는 함수
function showPosts(category) {
  post.innerHTML = ''; // 이전에 있던 것들 초기화

  const posts = postArray[category]; // 카테고리 정보 저장

  // 배열 역순으로 (제일 최근에 입력한 게 제일 위로 가게)
  for (let i = posts.length - 1; i >= 0; i--) {
    const postData = posts[i];

    const container = document.createElement('div');
    container.classList.add('post-container');

    const titleDiv = document.createElement('div');
    titleDiv.textContent = postData.title;

    const contentDiv = document.createElement('div');
    contentDiv.textContent = postData.content;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
      postArray[category].splice(i, 1); //splice(a,b) : a번쨰에서 b개 제거
      localStorage.setItem('postArray', JSON.stringify(postArray));
      container.remove();
    });

    container.appendChild(titleDiv);
    container.appendChild(contentDiv);
    container.appendChild(deleteBtn);

    post.appendChild(container);
  }

  post.style.display = 'block';
  // currentCategory = category;
}

nav1.addEventListener('click', () => {
  showPosts('어제 먹은 거');
});

nav2.addEventListener('click', () => {
  showPosts('오늘 먹을 거');
});

nav3.addEventListener('click', () => {
  showPosts('먹고 싶은 거');
});

//추가하기 버튼 클릭 시
add.addEventListener('click', () => {
  if (document.getElementById('add')) return;

  navigation.remove();
  post.innerHTML = '';
  post.style.display = 'none'; // 사라지게

  // 추가하기 버튼 누르면 나올 것들
  const kk = document.createElement('div');
  kk.setAttribute('id', 'add'); // 나올 것을 한꺼번에 담을 div

  const title = document.createElement('div');
  title.textContent = '글 제목';

  const title_in = document.createElement('input');
  title_in.setAttribute('type', 'text');
  title_in.setAttribute('placeholder', '제목을 입력하세요'); // 글제목 입력칸

  const cate = document.createElement('div');
  cate.textContent = '카테고리';

  const cate_in = document.createElement('select');

  const option1 = document.createElement('option');
  option1.value = '어제 먹은 거';
  option1.textContent = '어제 먹은 거';

  const option2 = document.createElement('option');
  option2.value = '오늘 먹을 거';
  option2.textContent = '오늘 먹을 거';

  const option3 = document.createElement('option');
  option3.value = '먹고 싶은 거';
  option3.textContent = '먹고 싶은 거'; // 카테고리 선택

  cate_in.appendChild(option1);
  cate_in.appendChild(option2);
  cate_in.appendChild(option3);

  const text = document.createElement('div');
  text.textContent = '글 내용';

  const text_in = document.createElement('textarea');
  text_in.setAttribute('rows', '5');
  text_in.setAttribute('placeholder', '내용을 입력하세요'); // 글 내용 작성

  const btn = document.createElement('div'); // 제거버튼,추가하기 버튼 넣을 div
  btn.style.marginTop = '10px'; // 버튼 윗쪽 간격 조절

  const back = document.createElement('button'); // 돌아가기 버튼
  back.textContent = '🗑️';
  back.style.marginRight = '10px';
  back.addEventListener('click', () => {
    kk.remove();
    nav.appendChild(navigation);
    post.innerHTML = '';
    post.style.display = 'none';
    // currentCategory = null;
  });

  const submit = document.createElement('button'); // 추가 생성 버튼
  submit.textContent = '✔️';

  submit.addEventListener('click', () => {
    const TITLE = title_in.value.trim();
    const TEXT = text_in.value.trim(); // trim으로 공백 제거
    const CATE = cate_in.value;

    if (!TITLE || !TEXT) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    const newPost = { title: TITLE, content: TEXT };
    postArray[CATE].push(newPost); // 배열 끝에 추가
    localStorage.setItem('postArray', JSON.stringify(postArray));

    kk.remove();
    nav.appendChild(navigation);
    post.innerHTML = '';
    post.style.display = 'none';
    currentCategory = null;
  });

  btn.appendChild(back);
  btn.appendChild(submit);

  kk.appendChild(title);
  kk.appendChild(title_in);
  kk.appendChild(cate);
  kk.appendChild(cate_in);
  kk.appendChild(text);
  kk.appendChild(text_in);
  kk.appendChild(btn);

  nav.appendChild(kk);
});
