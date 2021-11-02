import ch02.colors.Color //다른 패키지에서 정의한 Color 클래스 import
import ch02.colors.Color.*

fun getWarmth(color: Color) = when(color) {
  RED, ORANGE, YELLOW -> "warm" //import한 enum 상수를 이름만으로 사용 
  GREEN -> "neutral"
  BLUE, INDIGO, VIOLET -> "cold"
}
