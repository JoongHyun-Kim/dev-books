val binaryReps = TreeMap<Char, String>() //키에 대해 정렬하기 위해 TreeMap 사용

for (c in 'A'..'F') {
  val binary = Integer.toBinaryString(c.toInt()) //아스키 코드를 2진 표현으로 변경
  binaryReps[c] = binary //c를 키로 c의 2진 표현을 맵에 넣는다.
}

for((letter, binary) in binaryReps) { //맵에 대해 iteration
  println("$letter = $binary")
}
