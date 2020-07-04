const API_URL = process.env.REACT_APP_API_URL;

export async function getData<T>(): Promise<T[]> {
  const response = await fetch(`${API_URL}/comments`);
  const json = await response.json();

  return json;
}

export async function postData(comment: CommentItem) {
  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
  });
  const json = await response.json();

  return json;
}
