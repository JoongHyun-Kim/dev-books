//if를 when으로 변경
fun eval(e: Expr): Int = 
  when (e) {
    is Num ->
      e.value
    is Sum ->
      eval(e.right) + eval(e.left)
    else ->
      throw IllegalArgumentException("Unknown expression")
  }
