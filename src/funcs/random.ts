export const randomColor = () => {
  return "#" + Math.random().toString(16).substring(2, 8).padEnd(6, '0')
}

export const randomString = (len: number) => {
  return len <= 11 ? Math.random().toString(36).substring(2, 2+len).padEnd(len, '0') : randomString(11) + randomString(len-11)
}
