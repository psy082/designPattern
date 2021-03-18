/**
 * Practice #1
 * 소유 기반의 코드를 구현하되, 강의에 있는 전략함수 대신 전략 클래스를 적용하여 개발 하기
 * 전략 클래스는 추상층과 구상층을 구분한다.
 * 완성된 전략 클래스를 이용하면 다음과 같이 작성할 수 있다.
 * => 전략 객체가 해결을 하도록 만들기.
 */

const loader = new Github('hikaMaeng', 'codespitz79');

const img = new ImageLoader('#a');  // 전략 객체
loader.setParser(img);
loader.load('xx.png');

const md = new MdLoader('#b');  // 전략 객체
loader.setParser(md);
loader.load('xx.md');

/**
 * Practice #2
 * Loader의 라우팅 테이블을 2단계로 확장하여
 * 다양한 저장소별 매핑이 가능하도록 작성하라.
 * 완성된 Loader는 다음에 대응할 수 있다
 * (연습문제 1의 구조를 활용하거나 강의시의 전략함수기반 중 아무거나 선택)
 */

// router 내부가 또 router로 구성될 수 있다. -> 인터넷 ip의 원리

const loader = new Loader();
loader.addRepo('s74', 'hikaMaeng', 'codespitz74');      //s74 레포지토리 등록
loader.addRouter('s74', 'jpg,png,gif', img, el('#a'));
loader.addRouter('s74', 'md', md, el('#b'));

loader.addRepo('s79', 'hikaMaeng', 'codespitz79');      //s79 레포지토리 등록
loader.addRouter('s79', 'jpg,png,gif', img, el('#a'));
loader.addRouter('s79', 'md', md, el('#b'));

loader.load('s74', 'xx.jpg');
loader.load('s79', 'xx.md');
