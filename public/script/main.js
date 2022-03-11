function setStyleDisplayToHTMLElements(HTMLElementsArray, display) {
    HTMLElementsArray.filter(
        (element) => element.style.display !== display
    ).forEach(
        (element) => {
            element.style.display = display;
        }
    );
}

const allBookWrappers = [...document.querySelectorAll('.book__wrapper')];

document.querySelector('input').addEventListener('keyup', (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filtered = allBookWrappers.filter(
        (bookContainer) => {
            const authors = bookContainer.querySelector('.book__author').innerText.trim().slice(3).toLowerCase().split(`, `).map( (author) => author.split(' ')).flat();
            const publishInfo = bookContainer.querySelector('.book__publish-info').innerText.trim().toLowerCase().split(`, `);
            const subjectText = [
                ...authors,
                ...bookContainer.querySelector('.book__title').innerText.trim().toLowerCase().split(' '),
                ...bookContainer.querySelector('.book__subtitle').innerText.trim().toLowerCase().split(' '),
                ...[...bookContainer.querySelectorAll('.book__tags > span')].map((tag) => tag.innerText.trim().toLowerCase()),
                ...publishInfo
            ];
            for (srcValue of searchValue.replace(/\s+/g, ' ').trim().split(' ')) {
                if (srcValue !== '') {
                    for (subjectValue of subjectText) {
                        if (subjectValue.startsWith(srcValue)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    );
    setStyleDisplayToHTMLElements(allBookWrappers, `none`);
    setStyleDisplayToHTMLElements(filtered, `inline-block`);
});