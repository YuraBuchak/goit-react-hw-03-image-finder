const defaultUrl = 'https://pixabay.com/api/';
const ApiKey = '35063587-fa9231e1cb527798f33412cb6';
const paramsHttp = {
  per_page: '12',
  image_type: 'photo',
  orientation: 'horizontal',
};

export const fetchPicture = async (text, page) => {
  try {
    const data = await fetch(
      `${defaultUrl}?q=${text}&page=${page}&key=${ApiKey}&image_type=${paramsHttp.image_type}&orientation=${paramsHttp.orientation}&per_page=${paramsHttp.per_page}`
    );

    return await data.json();
  } catch (error) {
    console.log(error);
  }
};
