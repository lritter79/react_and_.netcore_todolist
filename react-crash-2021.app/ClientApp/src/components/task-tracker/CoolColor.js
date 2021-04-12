const CoolColor = (i) => {
    i = i > 3 ? i % 4 : i 
    switch(i) {
      case 0:
        return 'pink';
      case 1:
        return 'white';
      case 2:
        return 'orange';
      case 3:
          return 'green';
      default:
        return '';
    }
}

export default CoolColor