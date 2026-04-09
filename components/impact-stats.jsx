export default function ImpactStats({ title, description, stats, bgColor = "bg-[#3d3d3d]", textColor = "text-white" }) {
  return (
    <section className={`py-16 ${bgColor} ${textColor}`}>
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            {description && <p className="max-w-2xl mx-auto text-gray-300">{description}</p>}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className={`text-4xl font-bold ${stat.color || "text-[#4db6ac]"} mb-2`}>{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

