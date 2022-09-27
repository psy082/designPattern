const Info = class {
    constructor(json) {
        const {title, header, items} = json;
        if(typeof title != 'string') throw 'Invalid title';
        if(!Array.isArray(header) || !header.length) throw 'Invalid header';
        if(!Array.isArray(items) || !items.length) throw 'Invalid items';
        this._private = {title, header, items};
    }

    get title(){return this._private.title};
    get header(){return this._private.header};
    get items(){return this._private.items};
}

const Data = class {
    async getData() {throw "getData must override"};
}

const JsonData = class extends Data {
    constructor(data) {
        super();
        this._data = data;
    }
    async getData() {
        if(typeof this._data == 'string') {
            const response = await fetch(this._data);
            return await response.json();
        }else return new Info(json);
    }
}

const data = new JsonData("75_1.json");
const renderer = new Renderer();
renderer.render(data);