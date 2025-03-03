import CallToAction from "../components/CallToAction";
export const metadata = {
  title: "Projects",
};
export default function Projects() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        vehicula augue malesuada porttitor ullamcorper. Curabitur elementum
        suscipit magna, vitae suscipit ipsum aliquet ac. Morbi luctus ac mi at
        consectetur. Vivamus dapibus ac nunc ac dignissim. Phasellus tempus
        sodales nibh, eget convallis neque ultrices vel. Nulla efficitur magna
        diam, sed mattis mauris fringilla eget. Vivamus sapien purus, blandit
        non blandit nec, mollis eget purus. Curabitur semper viverra magna,
        ullamcorper fermentum leo commodo eu. Donec viverra quam sed efficitur
        blandit. Vivamus vel tortor efficitur, venenatis est at, hendrerit
        lorem.
      </p>
      <CallToAction />
      <p>
        Nam urna dolor, malesuada sodales justo quis, fringilla euismod ipsum.
        Vestibulum ac scelerisque ligula, vitae maximus ipsum. Quisque non
        tortor lorem. Nulla eget dolor eleifend, ultricies eros a, malesuada
        risus. Nulla sapien mi, tristique ac suscipit id, condimentum sed
        lectus. In dictum felis quis sagittis consequat. Vestibulum ac ante ut
        purus sagittis gravida sit amet in purus. Nulla ut consequat arcu.
        Mauris finibus neque odio, sed venenatis quam gravida vitae. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Sed sed magna enim. Ut viverra sapien ut nulla
        malesuada commodo. Etiam ac justo nec mauris semper pharetra. Morbi at
        dictum erat, egestas varius tortor. Nunc vitae lorem quam.
      </p>
      <p>
        Donec ac ligula convallis, venenatis risus in, sollicitudin augue.
        Nullam nulla eros, dapibus ac pulvinar vel, volutpat et arcu. Sed
        molestie finibus ipsum et consequat. Vivamus hendrerit laoreet nibh, sed
        sagittis risus sollicitudin vitae. Nulla fringilla quis metus at
        pharetra. Integer a lorem placerat, convallis nisi eget, ullamcorper
        erat. Donec sollicitudin erat sit amet commodo placerat. Morbi a tellus
        suscipit, varius ex vel, bibendum dolor. Duis lacinia ullamcorper metus,
        sed auctor libero blandit nec. Duis lobortis magna ut neque condimentum,
        at condimentum purus faucibus. In euismod eros in placerat dictum.
        Praesent molestie massa est, at vulputate magna dignissim nec. Sed
        dignissim sit amet nibh quis porta.
      </p>
      <CallToAction />
    </div>
  );
}
