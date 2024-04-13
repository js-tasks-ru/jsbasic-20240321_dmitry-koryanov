function makeFriendsList(friends) {
  let ulElem = document.createElement('ul');

  for ({firstName, lastName} of friends) {
    let liElem = document.createElement('li');
    liElem.textContent = `${firstName} ${lastName}`;
    ulElem.append(liElem);
  }

  return ulElem;
}
