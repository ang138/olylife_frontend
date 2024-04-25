{products.length > 0 ? (
    products.map(
      (order) =>
        order.status === 1 && (
          <div key={order.id}>
            <div className="flex justify-between p-4 lg:p-8">
              <span className="font-bold text-sm lg:text-2xl">
                คำสั่งซื้อ OL
                {("00000000" + order.id).slice(-8)}
                <p className="text-xs lg:text-lg text-slate-400"></p>
              </span>
              <div className="flex mb-2">
                <button className="text-xs lg:text-lg mx-3 bg-sky-200 p-1 lg:p-3 rounded-md">
                  รอจัดส่ง
                </button>
              </div>
            </div>
            <div className="flex px-28">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  {order.order_products.map(
                    (orderProduct: any, index: number) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4 pl-20 w-60">
                          <div className="flex justify-center items-right-2">
                            {orderProduct.products[0].product_images.map(
                              (
                                image: any,
                                imageIndex: number
                              ) => (
                                <img
                                  key={imageIndex}
                                  src={`data:image/jpeg;base64,${image.path}`}
                                  alt={`Product Image ${imageIndex}`}
                                  className="w-24 h-24 rounded-sm"
                                />
                              )
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-base text-black pb-16">
                          {orderProduct.products[0].name}{" "}
                          <br />
                          <span className="text-sm text-gray-500">
                            X {orderProduct.totalAmount}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-right pr-16">
                          {orderProduct.totalPrice} บาท
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between p-4 lg:p-4">
              <span className="font-bold text-sm lg:text-2xl"></span>
              <div className="flex mb-2 pr-10 text-base font-medium">
                ราคารวม :&nbsp;
                <h1 className="text-xl">
                  {order.totalPrice} บาท
                </h1>
              </div>
            </div>
            <hr className="w-full h-4 mx-auto my-8 bg-white border-0 md:my-4 dark:bg-gray-700" />
          </div>
        )
    )
  ) : (
    <div>ไม่มีข้อมูลสินค้า</div>
  )}