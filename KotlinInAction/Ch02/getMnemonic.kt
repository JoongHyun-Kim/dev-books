fun getMnemonic(color: Color) = //함수의 반환 값으로 when식 직접 사용
  when (color) { //색이 특정 enum 상수와 같으면 대응하는 문자열 리턴
    Color.RED -> "Richard"
    Color.ORANGE -> "Of"
    Color.YELLOW -> "York"
    Color.GREEN -> "Grave"
    Color.BLUE -> "Battle"
    Color.INDIGO -> "In"
    Color.VIOLET -> "Vain"
  }
