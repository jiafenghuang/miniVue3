import { camelize, toHandlerKey } from "../shared";

export  function emit(instance, event,...args){
  console.log(event);
  //从instance.props 中获取 调用emit的函数
  const { props } = instance
  // add=>Add
  // add-foo =>AddFoo

  const handlerName = toHandlerKey(camelize(event))

  const handler = handlerName.length > 0 && props[handlerName]
  handler && handler(...args)
}