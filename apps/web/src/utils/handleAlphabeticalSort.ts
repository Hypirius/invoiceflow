function handleAlphabeticalSort(firstItem: string, secondItem: string) {
  return firstItem
    .toLocaleLowerCase()
    .localeCompare(secondItem.toLocaleLowerCase());
}

export default handleAlphabeticalSort;
