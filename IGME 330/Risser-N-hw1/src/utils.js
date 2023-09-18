const randElement = (array) =>
{
    return array[Math.floor(Math.random() * array.length)];
}

export{randElement};