export default class StyleUrlFormatter {
    constructor(currentPage) {
        this.currentPage = currentPage;
    }
    format(url) {
        const currentPage = this.currentPage.value;
        let pathOffset = './';
        if (currentPage.depth > 0) {
            let index;
            pathOffset = '';
            for (index = 0; index < currentPage.depth; index++) {
                pathOffset += '../';
            }
        }
        return pathOffset + 'Style/' + url + '.css';
    }
}
