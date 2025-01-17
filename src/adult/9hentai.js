// == 9Hentai ======================================================================================
export default {
  name: '9Hentai',
  url: /https?:\/\/(www.)?9hentai.ru\/g\/.+/,
  homepage: 'https://9hentai.ru',
  language: ['English'],
  category: 'hentai',
  waitAttr: ['#jumpPageModal input', 'max'],
  run() {
    let api = null;
    $.ajax({
      type: 'POST',
      url: '/api/getBookByID',
      data: { id: parseInt(W.location.pathname.match(/[0-9]+/)[0], 10) },
      dataType: 'json',
      async: false,
      success(res) {
        api = res.results;
      },
    });
    return {
      title: api.title,
      series: `/g/${api.id}/`,
      quant: api.total_page,
      prev: '#',
      next: '#',
      listImages: [...Array(api.total_page).keys()].map(
        (i) => `${api.image_server + api.id}/${i + 1}.jpg`,
      ),
    };
  },
};
