export default class StyleUrlFormatter {
    constructor(currentPage) {
        this.currentPage = currentPage;
    }
    format(url) {
        const currentPage = this.currentPage.value;
        const depth = currentPage != null ? this.calculatePageDepth(currentPage) : 0;
        let pathOffset = './';
        if (depth > 0) {
            let index;
            pathOffset = '';
            for (index = 0; index < depth; index++) {
                pathOffset += '../';
            }
        }
        return pathOffset + 'Style/' + url + '.css';
    }
    calculatePageDepth(page) {
        return page.baseUrl.replace(/[^\/]*/g, '').length - 1;
    }
}
