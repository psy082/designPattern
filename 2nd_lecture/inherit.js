// 프로그램의 시점에 대해서
// 프로그램의 여러 개념이 그러하듯이 컴파일 타임과, 런 타임은 절대적인 개념이 아니라 상대적인 개념이다.
// 컴파일 언어들의 경우 컴파일 타임과, 런 타임이 확실히 구분이 되고
// Javascript와 같은 스트립트 타임은 두 시점이 구분되어 있지 않고, 살행 시점에서 상대적으로 컴파일 타임과, 런 타임이 정해진다.

const Github = class {                                          // 정의 시점 - 변하지 않는 부분
    constructor(id, repo) {
        this._base = `https://api.github.com/repos/${id}/${repo}/contents/`;
    }
    load(path) {                                                // 공통 부분 - Template Method
        const id = 'callback' + Github._id++;
        const f = Github[id] = ({data:{content}}) => {
            delete Github[id];
            document.head.removeChild(s);
            this._loaded(content);                              // 위임 부분 - if case 별로 달라져야 하는 부분
        };
        const s = document.createElement('script');
        s.src = `${this._base + path}?callback=Github.${id}`;
        document.head.appendChild(s);
    }
    _loaded(v){throw 'override!';}                              // Hook 역할
};
Github._id = 0;
const ImageLoader = class extends Github {                      // 실행 시점 - 변하는 부분, 정의 시점에 정의된 코드를 건드리지 않고도
                                                                // 확장자가 md, html jpg인 경우를 Guthub 코드를 건드리지 않고도 만들 수 있다.
    constructor(id, repo, target) {
        super(id, repo);
        this._target = target;
    }
    _loaded(v) {                                                // 위임 구현
        this._target.src = 'data:text/plain;base64,' + v;
    };                                              
}

const s75img = new ImageLoader(
    'hikaMaeng',
    'codespitz79',
    document.querySelector('#a')
);
s75img.load('einBig.png');

const MdLoader = class extends Github {
    constructor(id, repo, target) {
        super(id, repo);
        this._target = target;
    }
    _loaded(v) {
        this._target.innerHTML = this._parseMD(v);
    }
    _parseMD(v) {
        return d64(v).split('\n').map(v=>{
            let i = 3;
            while(i--){
                if(v.startsWith('#'.repeat(i + 1))) return `<h${i + 1}>${v.substr(i + 1)}</h${i + 1}>`;
            }
            return v
        }).join('<br>');
    }
};
const d64 = v => decodeURIComponent(
    atob(v).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
);

const s75md = new MdLoader('hikaMaeng', 'codespitz79', document.querySelector('#b'));
s75md.load('README.md');

// 분기문을 제거하는 방법은 케이스 개수만큼의 객체를 만든 후에 해당 객체를 선택하는 걸 런타임에 위임하는 것
