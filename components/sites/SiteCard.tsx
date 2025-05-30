import { Site } from '@prisma/client';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import Link from 'next/link';

interface SiteCardProps {
  site: Site;
}

export default function SiteCard({ site }: SiteCardProps) {
  return (
    <div className="group relative rounded-xl border border-gray-800/50 bg-gray-900/50 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-gray-700/50 hover:shadow-lg">
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={site.thumbnailUrl || '/thumbnails/default.png'}
          alt={site.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold mb-1 truncate">{site.name}</h3>
        <p className="text-sm text-gray-400 mb-4 truncate">{site.slug}</p>
        
        <Link
          href={`/dashboard/${site.id}/editor`}
          className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400 transition-colors"
        >
          <span>Open Editor</span>
          <FontAwesomeIcon icon={faExternalLink as IconProp} className="w-3 h-3" />
        </Link>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
} 