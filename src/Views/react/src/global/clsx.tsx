const clsx = function(...classNames: string[]) {
  // join strings together by delimiter " " but does not repeat same words separated by spaces
  return classNames.filter((className, index, self) => self.indexOf(className) === index).join(" ");
};

export default clsx;