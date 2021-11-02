interface Expr
class Num(val value: Int) : Expr
class Sum(val left: Expr, val right: Expr) : Expr

fun eval(e: Expr): Int {
  if(e is Num) {
    val n = e as Num //불필요한 중복(is 사용 시 smart cast)
    return n.value
  }
  if(e is Sum) {
    return eval(e.right) + eval(e.left)
  }
  throw IllegalArgumentException("Unknown expression")
}

    
